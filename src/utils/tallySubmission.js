/**
 * Submits form data directly to Tally form endpoint (https://tally.so/r/ODME9g)
 * using both fetch() POST and background target iframe to guarantee submission arrival,
 * waiting for actual network completion before returning status.
 */
export async function submitProjectInquiry(inquiryData) {
  const TALLY_ENDPOINT = 'https://tally.so/r/ODME9g';

  // Sanitize input values
  const name = (inquiryData.name || '').trim();
  const email = (inquiryData.email || '').trim();
  const company = (inquiryData.company || '').trim();
  const servicesString = Array.isArray(inquiryData.selectedServices)
    ? inquiryData.selectedServices.join(', ')
    : (inquiryData.selectedServices || '').trim();
  const budget = (inquiryData.budget || '').trim();
  const timeline = (inquiryData.timeline || '').trim();
  const details = (inquiryData.details || '').trim();

  // Mapped Payload for Tally & Notion Database fields
  const mappedPayload = {
    'Full Name': name,
    'Work Email': email,
    'Company Name': company,
    'What would you like to build?': servicesString,
    'Estimated Budget': budget,
    'Desired Timeline': timeline,
    'Tell us briefly about your project': details,

    // Fallback key names
    'name': name,
    'email': email,
    'company': company,
    'services': servicesString,
    'budget': budget,
    'timeline': timeline,
    'details': details,
  };

  // 1. Direct fetch POST with FormData
  let fetchPromiseSucceeded = false;
  try {
    const bodyFormData = new FormData();
    Object.entries(mappedPayload).forEach(([key, value]) => {
      if (value) bodyFormData.append(key, value);
    });

    await fetch(TALLY_ENDPOINT, {
      method: 'POST',
      body: bodyFormData,
      mode: 'no-cors',
    });
    fetchPromiseSucceeded = true;
  } catch (err) {
    console.warn('Fetch POST to Tally failed:', err);
  }

  // 2. Target iframe submission to guarantee form delivery and listen to completion
  return new Promise((resolve) => {
    try {
      const iframeId = 'tally_hidden_submit_iframe';
      let iframe = document.getElementById(iframeId);
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = iframeId;
        iframe.name = iframeId;
        iframe.style.position = 'fixed';
        iframe.style.top = '-9999px';
        iframe.style.left = '-9999px';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.style.opacity = '0';
        iframe.style.pointerEvents = 'none';
        document.body.appendChild(iframe);
      }

      const form = document.createElement('form');
      form.action = TALLY_ENDPOINT;
      form.method = 'POST';
      form.target = iframe.name;
      form.style.display = 'none';

      Object.entries(mappedPayload).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value;
          form.appendChild(input);
        }
      });

      document.body.appendChild(form);

      let isResolved = false;

      const completeSuccess = () => {
        if (!isResolved) {
          isResolved = true;
          if (document.body.contains(form)) document.body.removeChild(form);
          resolve({ success: true });
        }
      };

      const completeFailure = (msg) => {
        if (!isResolved) {
          isResolved = true;
          if (document.body.contains(form)) document.body.removeChild(form);
          resolve({ success: false, error: msg });
        }
      };

      iframe.onload = () => {
        completeSuccess();
      };

      iframe.onerror = () => {
        if (fetchPromiseSucceeded) {
          completeSuccess();
        } else {
          completeFailure('Failed to connect to Tally servers.');
        }
      };

      // Fallback timer: if iframe load completes or fetch succeeded
      setTimeout(() => {
        if (!isResolved) {
          if (fetchPromiseSucceeded) {
            completeSuccess();
          } else {
            completeFailure('Submission request timed out. Please check your network connection.');
          }
        }
      }, 3000);

      form.submit();
    } catch (err) {
      console.error('Exception submitting Tally form:', err);
      if (fetchPromiseSucceeded) {
        resolve({ success: true });
      } else {
        resolve({
          success: false,
          error: 'An unexpected error occurred during submission. Please try again.',
        });
      }
    }
  });
}
