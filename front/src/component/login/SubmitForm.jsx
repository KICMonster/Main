import { useState, useEffect } from "react";

function SubmitForm({ formData }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const submitData = async () => {
      setSubmitting(true);
      try {
        // 여기에 API 호출 코드 작성
        const response = await fetch('https://localhost:9092/join/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmitSuccess(true);
          // 성공적으로 처리된 후에 필요한 작업 수행
        } else {
          throw new Error('Failed to submit data');
        }
      } catch (error) {
        console.error('Error submitting data:', error);
        setSubmitError('Failed to submit data');
      } finally {
        setSubmitting(false);
      }
    };

    if (formData) {
      submitData();
    }
  }, [formData]);

  return (
    <div>
      {submitting && <p>Submitting...</p>}
      {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
      {submitSuccess && <p style={{ color: 'green' }}>Submitted successfully!</p>}
    </div>
  );
}
export default SubmitForm;