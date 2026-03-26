import React, { useEffect, useMemo, useState } from "react";
import {
  RISK_QUESTIONS,
  RISK_SCORE_MAX,
  getRiskProfileFromTotal,
} from "../data/riskProfileQuestions";

const RiskProfilingPage = () => {
  const questions = Array.isArray(RISK_QUESTIONS) ? RISK_QUESTIONS : [];
  const lastIndex = Math.max(0, questions.length - 1);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const safeIndex = Math.max(0, Math.min(current, lastIndex));
  const q = questions[safeIndex];

  useEffect(() => {
    if (questions.length && current > lastIndex) {
      setCurrent(lastIndex);
    }
  }, [current, lastIndex, questions.length]);

  const runningTotal = useMemo(
    () => Object.values(answers).reduce((a, b) => a + b, 0),
    [answers],
  );

  const answeredCount = Object.keys(answers).length;

  const handleSelect = (score) => {
    const active = questions[safeIndex];
    if (!active) return;

    const updated = { ...answers, [active.id]: score };
    setAnswers(updated);

    if (safeIndex < lastIndex) {
      const next = safeIndex + 1;
      setTimeout(() => setCurrent(next), 250);
    } else {
      const total = Object.values(updated).reduce((a, b) => a + b, 0);
      setResult({
        profile: getRiskProfileFromTotal(total),
        totalScore: total,
      });
    }
  };

  const reset = () => {
    setAnswers({});
    setCurrent(0);
    setResult(null);
  };

  // ── RESULT SCREEN ──────────────────────────────────────────────
  if (result) {
    const { profile: p, totalScore } = result;
    return (
      <div style={{ ...styles.page, marginTop: "60px" }}>
        <div style={styles.cardWide}>
          <div
            style={{
              ...styles.resultHeader,
              background: p.color,
            }}
          >
            <p style={styles.resultLabel}>Your Risk Profile</p>
            <h2 style={styles.resultType}>{p.type}</h2>
            <p style={styles.scoreLine}>
              Total score: <strong>{totalScore}</strong> / {RISK_SCORE_MAX}
            </p>
            <p style={styles.bandLine}>{p.band}</p>
            <p style={styles.resultDesc}>{p.desc}</p>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Suggested Allocation</h3>
            {Object.entries(p.allocation).map(([key, val]) => (
              <div key={key} style={styles.allocRow}>
                <span style={styles.allocLabel}>{key}</span>
                <div style={styles.barBg}>
                  <div
                    style={{
                      ...styles.barFill,
                      width: val,
                      background: p.color,
                    }}
                  />
                </div>
                <span style={styles.allocVal}>{val}</span>
              </div>
            ))}
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Recommended Products</h3>
            <ul style={styles.productList}>
              {p.products.map((item) => (
                <li key={item} style={styles.productItem}>
                  <span style={{ ...styles.dot, background: p.color }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={styles.section}>
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              <strong>Disclaimer:</strong> This risk assessment is based on your
              responses and is provided as educational information. It does not
              constitute investment advice. We recommend discussing your risk
              profile with our financial advisors before making investment
              decisions. Past performance is not indicative of future results.
            </p>
          </div>

          <div
            style={{ display: "flex", gap: "12px", padding: "12px 24px 20px" }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                ...styles.retakeBtn,
                width: "calc(50% - 6px)",
                margin: 0,
                background: "#f1f5f9",
                color: "#1e293b",
                border: "1px solid #e2e8f0",
              }}
            >
              Retake
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              style={{ ...styles.retakeBtn, width: "calc(50% - 6px)", margin: 0 }}
            >
              Print / Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!questions.length || !q) {
    return (
      <div style={{ ...styles.page, marginTop: "60px" }}>
        <p style={{ color: "#64748b", textAlign: "center" }}>
          Risk questionnaire is unavailable. Please refresh the page.
        </p>
      </div>
    );
  }

  // ── QUESTION SCREEN ────────────────────────────────────────────
  const progress = Math.round(((safeIndex + 1) / questions.length) * 100);

  return (
    <div style={{ ...styles.page, marginTop: "60px" }}>
      <div style={styles.cardWide}>
        <div style={styles.topBar}>
          <span style={styles.qCount}>
            Q{safeIndex + 1} / {questions.length}
            <span style={styles.sectionTag}> · {q.section}</span>
          </span>
          <span style={styles.progressText}>{progress}%</span>
        </div>

        <div style={styles.scoreStrip}>
          <span style={styles.scoreStripLabel}>
            Running score: <strong>{runningTotal}</strong>
          </span>
          <span style={styles.scoreStripMeta}>
            {answeredCount} of {questions.length} answered · Max {RISK_SCORE_MAX}
          </span>
        </div>

        <div style={styles.progressBg}>
          <div
            style={{
              ...styles.progressFill,
              width: `${progress}%`,
            }}
          />
        </div>

        <h2 style={styles.questionText}>{q.question}</h2>

        <div style={styles.optionList}>
          {q.options.map((opt, idx) => (
            <button
              type="button"
              key={`${q.id}-${idx}`}
              onClick={() => handleSelect(opt.score)}
              style={{
                ...styles.optionBtn,
                ...(answers[q.id] === opt.score ? styles.optionSelected : {}),
              }}
            >
              <span style={styles.optionLabel}>{opt.label}</span>
              <span style={styles.optionScore}>+{opt.score}</span>
            </button>
          ))}
        </div>

        <div style={styles.nav}>
          <button
            type="button"
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={safeIndex === 0}
            style={{
              ...styles.navBtn,
              opacity: safeIndex === 0 ? 0.3 : 1,
              cursor: safeIndex === 0 ? "not-allowed" : "pointer",
            }}
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 12px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  cardWide: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    width: "100%",
    maxWidth: "720px",
    overflow: "hidden",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px 8px",
    color: "#64748b",
    fontSize: "13px",
  },
  qCount: { fontWeight: 600, color: "#1e293b" },
  sectionTag: { fontWeight: 500, color: "#64748b" },
  progressText: { fontWeight: 600, color: "#16a34a" },
  scoreStrip: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "8px",
    padding: "0 24px 10px",
    fontSize: "12px",
    color: "#64748b",
  },
  scoreStripLabel: {},
  scoreStripMeta: { opacity: 0.9 },
  progressBg: {
    height: "6px",
    background: "#e2e8f0",
    margin: "0 24px",
    borderRadius: "99px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "#16a34a",
    borderRadius: "99px",
    transition: "width 0.3s ease",
  },
  questionText: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#1e293b",
    padding: "20px 16px 10px",
    lineHeight: 1.5,
    margin: 0,
  },
  optionList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "10px 16px 16px",
    maxHeight: "min(52vh, 480px)",
    overflowY: "auto",
  },
  optionBtn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    background: "#f8fafc",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    padding: "10px 14px",
    textAlign: "left",
    fontSize: "13px",
    color: "#334155",
    cursor: "pointer",
    transition: "all 0.15s",
    fontFamily: "inherit",
  },
  optionLabel: { flex: 1, lineHeight: 1.45 },
  optionScore: {
    flexShrink: 0,
    fontSize: "11px",
    fontWeight: 700,
    color: "#16a34a",
    background: "#ecfdf5",
    padding: "4px 8px",
    borderRadius: "6px",
  },
  optionSelected: {
    borderColor: "#16a34a",
    background: "#f0fdf4",
    color: "#15803d",
    fontWeight: 600,
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 24px 20px",
    gap: "12px",
  },
  navBtn: {
    background: "none",
    border: "none",
    color: "#64748b",
    fontSize: "14px",
    cursor: "pointer",
    padding: "6px 12px",
    fontWeight: 500,
    transition: "color 0.2s",
  },

  resultHeader: {
    padding: "28px 24px",
    textAlign: "center",
    color: "#fff",
  },
  resultLabel: {
    fontSize: "13px",
    opacity: 0.85,
    margin: "0 0 6px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: 600,
  },
  resultType: {
    fontSize: "32px",
    fontWeight: 800,
    margin: "0 0 8px",
  },
  scoreLine: {
    fontSize: "16px",
    margin: "0 0 6px",
    opacity: 0.95,
  },
  bandLine: {
    fontSize: "13px",
    margin: "0 0 12px",
    opacity: 0.88,
    fontWeight: 500,
  },
  resultDesc: {
    fontSize: "15px",
    opacity: 0.95,
    margin: 0,
    lineHeight: 1.6,
  },
  section: {
    padding: "24px 24px",
    borderTop: "1px solid #f1f5f9",
  },
  sectionTitle: {
    fontSize: "12px",
    fontWeight: 700,
    color: "#475569",
    margin: "0 0 16px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  allocRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "14px",
  },
  allocLabel: {
    fontSize: "13px",
    color: "#64748b",
    width: "70px",
    flexShrink: 0,
    fontWeight: 500,
  },
  barBg: {
    flex: 1,
    height: "10px",
    background: "#f1f5f9",
    borderRadius: "99px",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: "99px",
    transition: "width 0.6s ease",
  },
  allocVal: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#1e293b",
    width: "40px",
    textAlign: "right",
  },
  productList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  productItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "14px",
    color: "#334155",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  retakeBtn: {
    display: "block",
    width: "calc(100% - 48px)",
    margin: "20px 24px 24px",
    padding: "13px",
    background: "#1e293b",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.2s",
  },
};

export default RiskProfilingPage;
