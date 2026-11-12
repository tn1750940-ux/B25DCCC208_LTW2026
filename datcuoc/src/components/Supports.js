import React from 'react';

const Supports = ({
  status,
  usedSupports,
  isInsured,
  onUsePreview,
  onUseInsurance,
  onUseHint,
}) => {
  const canPreview = status === 'betting' && !usedSupports.preview;
  const canInsure =
    (status === 'betting' || status === 'answering') && !usedSupports.insurance;
  const canHint = status === 'answering' && !usedSupports.hint;

  return (
    <div className="supports-bar">
      <span className="supports-title">Quyền trợ giúp:</span>
      <button
        type="button"
        className="support-btn"
        disabled={!canPreview}
        onClick={onUsePreview}
      >
        Xem trước
      </button>
      <button
        type="button"
        className={`support-btn ${isInsured ? 'insured-active' : ''}`}
        disabled={!canInsure}
        onClick={onUseInsurance}
      >
        {isInsured || usedSupports.insurance ? 'Đã bảo hiểm' : 'Bảo hiểm'}
      </button>
      <button
        type="button"
        className="support-btn"
        disabled={!canHint}
        onClick={onUseHint}
      >
        Gợi ý
      </button>
    </div>
  );
};

export default Supports;
