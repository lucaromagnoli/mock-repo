/**
 * Component Documentation Demo Scripts
 * =====================================
 * Interactive functionality for the component documentation pages.
 */

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @param {HTMLButtonElement} button - Button element to update
 */
function copyToClipboard(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('demo-code__copy--copied');

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('demo-code__copy--copied');
    }, 2000);
  }).catch((err) => {
    console.error('Failed to copy:', err);
  });
}

/**
 * Initialize copy buttons
 */
function initCopyButtons() {
  document.querySelectorAll('.demo-code__copy').forEach((button) => {
    button.addEventListener('click', () => {
      const codeBlock = button.closest('.demo-code').querySelector('code');
      if (codeBlock) {
        copyToClipboard(codeBlock.textContent, button);
      }
    });
  });
}

/**
 * Initialize interactive demos
 * Updates preview and code when controls change
 */
function initInteractiveDemos() {
  document.querySelectorAll('[data-demo]').forEach((demo) => {
    const controls = demo.querySelectorAll('[data-control]');
    const preview = demo.querySelector('.demo-preview');
    const codeOutput = demo.querySelector('.demo-code code');

    if (!preview || !codeOutput) return;

    /**
     * Get current control values
     * @returns {Object} Current control values
     */
    function getControlValues() {
      const values = {};
      controls.forEach((control) => {
        const name = control.dataset.control;
        if (control.type === 'checkbox') {
          values[name] = control.checked;
        } else {
          values[name] = control.value;
        }
      });
      return values;
    }

    /**
     * Update preview based on demo type
     */
    function updatePreview() {
      const values = getControlValues();
      const demoType = demo.dataset.demo;

      if (demoType === 'button') {
        updateButtonPreview(preview, codeOutput, values);
      } else if (demoType === 'input') {
        updateInputPreview(preview, codeOutput, values);
      }
    }

    // Listen to control changes
    controls.forEach((control) => {
      control.addEventListener('change', updatePreview);
      control.addEventListener('input', updatePreview);
    });

    // Initial render
    updatePreview();
  });
}

/**
 * Update button preview
 * @param {HTMLElement} preview - Preview container
 * @param {HTMLElement} codeOutput - Code output element
 * @param {Object} values - Control values
 */
function updateButtonPreview(preview, codeOutput, values) {
  preview.innerHTML = '';

  const button = new Button({
    text: values.text || 'Button',
    variant: values.variant || 'primary',
    size: values.size || 'medium',
    disabled: values.disabled || false,
    loading: values.loading || false,
    onClick: () => console.log('Button clicked!')
  });

  preview.appendChild(button.render());

  // Update code
  const code = `const button = new Button({
  text: '${values.text || 'Button'}',
  variant: '${values.variant || 'primary'}',
  size: '${values.size || 'medium'}',
  disabled: ${values.disabled || false},
  loading: ${values.loading || false},
  onClick: () => console.log('Button clicked!')
});
document.body.appendChild(button.render());`;

  codeOutput.textContent = code;
}

/**
 * Update input preview
 * @param {HTMLElement} preview - Preview container
 * @param {HTMLElement} codeOutput - Code output element
 * @param {Object} values - Control values
 */
function updateInputPreview(preview, codeOutput, values) {
  preview.innerHTML = '';

  const inputProps = {
    type: values.type || 'text',
    name: 'demo-input',
    label: values.label || 'Label',
    placeholder: values.placeholder || 'Enter text...',
    helpText: values.helpText || '',
    required: values.required || false,
    disabled: values.disabled || false,
    validators: []
  };

  // Add email validator for email type
  if (values.type === 'email') {
    inputProps.validators.push(validators.email());
  }

  // Add validators for required
  if (values.required) {
    inputProps.validators.unshift(validators.required());
  }

  const input = new Input(inputProps);
  preview.appendChild(input.render());

  // Update code
  let validatorsCode = '';
  if (values.required && values.type === 'email') {
    validatorsCode = `
  validators: [validators.required(), validators.email()],`;
  } else if (values.required) {
    validatorsCode = `
  validators: [validators.required()],`;
  } else if (values.type === 'email') {
    validatorsCode = `
  validators: [validators.email()],`;
  }

  const code = `const input = new Input({
  type: '${values.type || 'text'}',
  name: 'my-input',
  label: '${values.label || 'Label'}',
  placeholder: '${values.placeholder || 'Enter text...'}',
  helpText: '${values.helpText || ''}',
  required: ${values.required || false},
  disabled: ${values.disabled || false},${validatorsCode}
});
document.body.appendChild(input.render());`;

  codeOutput.textContent = code;
}

/**
 * Initialize tabs
 */
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach((tabGroup) => {
    const tabs = tabGroup.querySelectorAll('[data-tab]');
    const panels = tabGroup.querySelectorAll('[data-tab-panel]');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetPanel = tab.dataset.tab;

        // Update tabs
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        // Update panels
        panels.forEach((panel) => {
          if (panel.dataset.tabPanel === targetPanel) {
            panel.classList.remove('hidden');
          } else {
            panel.classList.add('hidden');
          }
        });
      });
    });
  });
}

/**
 * Highlight active navigation item
 */
function highlightActiveNav() {
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.demo-nav__link').forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('demo-nav__link--active');
    }
  });
}

/**
 * Initialize on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
  initCopyButtons();
  initInteractiveDemos();
  initTabs();
  highlightActiveNav();
});

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.demoUtils = {
    copyToClipboard,
    updateButtonPreview,
    updateInputPreview
  };
}
