/**
 * Reusable utility function to submit project inquiries directly to Tally (https://tally.so/r/ODME9g)
 * without a backend server or page redirection.
 * Tally automatically relays submissions to the connected Notion Database CRM.
 */
export async function submitProjectInquiry(inquiryData) {
  const TALLY_ENDPOINT = 'https://tally.so/r/ODME9g';

  // Sanitize and prepare field data according to exact Tally field names
  const name = (inquiryData.name || '').trim();
  const email = (inquiryData.email || '').trim();
  const company = (inquiryData.company || '').trim();
  const servicesString = Array.isArray(inquiryData.selectedServices)
    ? inquiryData.selectedServices.join(', ')
    : (inquiryData.selectedServices || '').trim();
  const budget = (inquiryData.budget || '').trim();
  const timeline = (inquiryData.timeline || '').trim();
  const details = (inquiryData.details || '').trim();

  // Primary exact Tally field mappings
  const mappedPayload = {
    'Full Name': name,
    'Work Email': email,
    'Company Name': company,
    'What would you like to build?': servicesString,
    'Estimated Budget': budget,
    'Desired Timeline': timeline,
    'Tell us briefly about your project': details,

    // Secondary fallback field key mappings
    'name': name,
    'email': email,
    'company': company,
    'services': servicesString,
    'budget': budget,
    'timeline': timeline,
    'details': details,
  };

  try {
    // 1. Create a hidden target iframe so submission happens seamlessly in background without redirecting
    const iframeName = `tally_submit_frame_${Date.now()}`;
    const hiddenIframe = document.createElement('iframe');
    hiddenIframe.name = iframeName;
    hiddenIframe.id = iframeName;
    hiddenIframe.style.display = 'none';
    document.body.appendChild(hiddenIframe);

    // 2. Build hidden HTML form targeted at the background iframe
    const form = document.createElement('form');
    form.action = TALLY_ENDPOINT;
    form.method = 'POST';
    form.target = iframeName;

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
    form.submit();

    // 3. Parallel fetch POST call with no-cors as resilient fallback
    const bodyFormData = new FormData();
    Object.entries(mappedPayload).forEach(([key, value]) => {
      if (value) bodyFormData.append(key, value);
    });

    fetch(TALLY_ENDPOINT, {
      method: 'POST',
      body: bodyFormData,
      mode: 'no-cors',
    }).catch(() => {});

    // Allow time for execution
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Clean up temporary DOM elements
    setTimeout(() => {
      if (document.body.contains(form)) document.body.removeChild(form);
      if (document.body.contains(hiddenIframe)) document.body.removeChild(hiddenIframe);
    }, 2000);

    return { success: true };
  } catch (error) {
    console.error('Tally submission error:', error);
    return {
      success: false,
      error: 'Something went wrong while submitting your inquiry. Please try again.',
    };
  }
}
