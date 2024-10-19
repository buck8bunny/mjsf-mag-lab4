// src/directives/tooltip.directive.ts

import type { DirectiveBinding } from 'vue';

interface TooltipOptions {
  content: string;
  html?: boolean;
  delay?: number;
  trigger?: string;
  show?: boolean;
}

const tooltipDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    const options: TooltipOptions = binding.value;

    // Створення елемента для підказки
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltiptext';
    tooltip.innerHTML = options.html ? options.content : escapeHtml(options.content);
    el.classList.add('tooltip');
    el.appendChild(tooltip);

    // Затримка
    let timeout: ReturnType<typeof setTimeout>;

    const showTooltip = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        tooltip.style.visibility = 'visible';
      }, options.delay || 0);
    };

    const hideTooltip = () => {
      clearTimeout(timeout);
      tooltip.style.visibility = 'hidden';
    };

    const triggers = (options.trigger || 'hover').split(' ');

    // Додавання обробників подій
    if (triggers.includes('hover')) {
      el.addEventListener('mouseenter', showTooltip);
      el.addEventListener('mouseleave', hideTooltip);
    }
    if (triggers.includes('click')) {
      el.addEventListener('click', () => {
        if (tooltip.style.visibility === 'visible') {
          hideTooltip();
        } else {
          showTooltip();
        }
      });
    }
    if (triggers.includes('focus')) {
      el.addEventListener('focus', showTooltip);
      el.addEventListener('blur', hideTooltip);
    }
  },

  unmounted(el: HTMLElement) {
    el.removeEventListener('mouseenter', showTooltip);
    el.removeEventListener('mouseleave', hideTooltip);
    el.removeEventListener('click', hideTooltip);
    el.removeEventListener('focus', showTooltip);
    el.removeEventListener('blur', hideTooltip);
  },
};

// Функція для безпечного використання HTML
function escapeHtml(html: string) {
  const div = document.createElement('div');
  div.innerText = html;
  return div.innerHTML;
}

export default tooltipDirective;
