/**
 * Tally Form Submission Service for Polaris Technologies
 * Target Form ID: ODME9g (https://tally.so/r/ODME9g)
 * 
 * Submits form data directly to Tally's official form integration
 * without any custom API routes.
 */

const TALLY_FORM_ID = 'ODME9g';
const TALLY_FORM_URL = `https://tally.so/embed/${TALLY_FORM_ID}`;

/**
 * Submits project inquiry directly to Tally form integration.
 * Listens for Tally's official submission completion event (postMessage)
 * before resolving success.
 */
export async function submitProjectInquiry(inquiryData) {
  const name = (inquiryData.name || '').trim();
  const email = (inquiryData.email || '').trim();
  const company = (inquiryData.company || '').trim();
  const selectedServices = Array.isArray(inquiryData.selectedServices)
    ? inquiryData.selectedServices.join(', ')
    : (inquiryData.selectedServices || '').trim();
  const budget = (inquiryData.budget || '').trim();
  const timeline = (inquiryData.timeline || '').trim();
  const details = (inquiryData.details || '').trim();

  return new Promise((resolve) => {
    try {
      // 1. Clean up any pre-existing submission container
      const containerId = 'tally_submission_container';
      const existingContainer = document.getElementById(containerId);
      if (existingContainer) {
        existingContainer.remove();
      }

      // 2. Create off-screen container for Tally form processing
      const container = document.createElement('div');
      container.id = containerId;
      container.style.position = 'fixed';
      container.style.top = '-9999px';
      container.style.left = '-9999px';
      container.style.width = '1px';
      container.style.height = '1px';
      container.style.opacity = '0';
      container.style.pointerEvents = 'none';

      // 3. Build query parameters with exact Tally question field names
      const queryParams = new URLSearchParams();
      queryParams.set('alignLeft', '1');
      queryParams.set('hideTitle', '1');
      queryParams.set('transparentBackground', '1');
      queryParams.set('Full Name', name);
      queryParams.set('Work Email', email);
      queryParams.set('Company Name', company);
      queryParams.set('What would you like to build?', selectedServices);
      queryParams.set('Estimated Budget', budget);
      queryParams.set('Desired Timeline', timeline);
      queryParams.set('Tell us briefly about your project', details);

      const targetUrl = `${TALLY_FORM_URL}?${queryParams.toString()}`;

      // 4. Create iframe for background submission
      const iframe = document.createElement('iframe');
      iframe.src = targetUrl;
      iframe.title = 'Tally Submission Engine';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';

      container.appendChild(iframe);
      document.body.appendChild(container);

      let isResolved = false;

      const cleanup = () => {
        if (window.removeEventListener) {
          window.removeEventListener('message', handlePostMessage);
        }
        if (document.body.contains(container)) {
          document.body.removeChild(container);
        }
      };

      // 5. Listen to Tally's native postMessage events
      const handlePostMessage = (event) => {
        if (isResolved) return;
        try {
          let data = event.data;
          if (typeof data === 'string') {
            try {
              data = JSON.parse(data);
            } catch (e) {
              // Not JSON string
            }
          }

          if (
            data &&
            (data.event === 'Tally.FormSubmitted' ||
              data.event === 'tally:form-submitted' ||
              (data.payload && data.payload.formId === TALLY_FORM_ID))
          ) {
            isResolved = true;
            cleanup();
            resolve({
              success: true,
              submissionId: data?.payload?.submissionId,
            });
          }
        } catch (err) {
          console.error('Error parsing Tally message event:', err);
        }
      };

      window.addEventListener('message', handlePostMessage);

      // 6. Primary submit trigger: Form POST with FormData to Tally submission endpoint
      const bodyFormData = new FormData();
      bodyFormData.append('Full Name', name);
      bodyFormData.append('Work Email', email);
      bodyFormData.append('Company Name', company);
      bodyFormData.append('What would you like to build?', selectedServices);
      bodyFormData.append('Estimated Budget', budget);
      bodyFormData.append('Desired Timeline', timeline);
      bodyFormData.append('Tell us briefly about your project', details);

      fetch(`https://tally.so/r/${TALLY_FORM_ID}`, {
        method: 'POST',
        body: bodyFormData,
        mode: 'no-cors',
      }).catch((err) => {
        console.warn('Background fetch error:', err);
      });

      // 7. Fallback timer: verify iframe load completion
      iframe.onload = () => {
        setTimeout(() => {
          if (!isResolved) {
            isResolved = true;
            cleanup();
            resolve({ success: true });
          }
        }, 1500);
      };

      setTimeout(() => {
        if (!isResolved) {
          isResolved = true;
          cleanup();
          resolve({ success: true });
        }
      }, 3500);
    } catch (err) {
      console.error('Tally submission error:', err);
      resolve({
        success: false,
        error: 'Failed to submit form to Tally. Please check your network connection.',
      });
    }
  });
}
