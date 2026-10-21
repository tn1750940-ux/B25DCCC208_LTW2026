import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ContactDetail = ({ contacts = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isCalling, setIsCalling] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [callEnded, setCallEnded] = useState(false);

  useEffect(() => {
    if (!isCalling) {
      return undefined;
    }

    const timerId = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [isCalling]);

  const contactId = Number(id);
  const contact = contacts.find((item) => item.id === contactId);

  if (!contact) {
    return (
      <div>
        <p>Không tìm thấy liên hệ.</p>
        <button type="button" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>
    );
  }

  const { name, phone, email, group, favorite } = contact;

  const handleStartCall = () => {
    setSeconds(0);
    setCallEnded(false);
    setIsCalling(true);
  };

  const handleEndCall = () => {
    setIsCalling(false);
    setCallEnded(true);
  };

  return (
    <div>
      <p>{`Họ tên: ${name}`}</p>
      <p>{`Số điện thoại: ${phone}`}</p>
      <p>{`Email: ${email}`}</p>
      <p>{`Nhóm: ${group}`}</p>
      <p>{`Yêu thích: ${favorite ? 'Có' : 'Không'}`}</p>

      <div style={{ margin: '12px 0' }}>
        {!isCalling ? (
          <div>
            {callEnded && <p>{`Cuộc gọi kết thúc sau ${seconds} giây`}</p>}
            <button type="button" onClick={handleStartCall}>
              Gọi
            </button>
          </div>
        ) : (
          <div>
            <p>{`Đang gọi... ${seconds} giây`}</p>
            <button type="button" onClick={handleEndCall}>
              Kết thúc
            </button>
          </div>
        )}
      </div>

      <button type="button" onClick={() => navigate(-1)}>
        Quay lại
      </button>
    </div>
  );
};

export default ContactDetail;
