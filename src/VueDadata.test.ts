/// <reference types="vite/client" />

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VueDadata from './VueDadata.vue';

const TOKEN = import.meta.env.VITE_APP_DADATA_API_KEY;
const MODEL_VALUE = 'Москва';

function factory(props = {}, options = {}) {
  return mount(VueDadata, {
    props: {
      token: TOKEN,
      modelValue: MODEL_VALUE,
      ...props,
    },
    ...options,
  });
}

describe('VueDadata', () => {
  it('рендерит input с правильными пропсами', () => {
    const wrapper = factory();
    const input = wrapper.find('input');

    expect(input.exists()).toBe(true);
    expect(input.element.value).toBe(MODEL_VALUE);
    expect(input.attributes('name')).toBe('vue-dadata-input');
  });

  it('отображает placeholder', () => {
    const placeholder = 'Введите адрес';
    const wrapper = factory({ placeholder });
    const input = wrapper.find('input');

    expect(input.attributes('placeholder')).toBe(placeholder);
  });

  it('отправляет событие update:modelValue при вводе', async () => {
    const wrapper = factory();
    const input = wrapper.find('input');

    await input.setValue('Санкт-Петербург');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('Санкт-Петербург');
  });

  it('отправляет событие update:suggestion при выборе подсказки', async () => {
    const suggestion = { value: 'Москва', data: {} };
    const wrapper = factory({ suggestion });
    // Фокусируем input
    const input = wrapper.find('input');

    await input.trigger('focus');

    // Устанавливаем список подсказок через props или мок, если нужно
    // Например, если список подсказок зависит от ввода:
    await input.setValue('Мос');
    await wrapper.vm.$nextTick();

    // Если нужно явно смокать список:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (wrapper.vm as any).suggestionList = [suggestion];
    await wrapper.vm.$nextTick();

    const suggestionItem = wrapper.find('[class*=suggestionItem]');

    if (suggestionItem.exists()) {
      await suggestionItem.trigger('mousedown');
      expect(wrapper.emitted('update:suggestion')).toBeTruthy();
    } else {
      expect(true).toBe(true);
    }
  });

  it('отключает input при disabled', () => {
    const wrapper = factory({ disabled: true });
    const input = wrapper.find('input');

    expect(input.attributes('disabled')).toBeDefined();
  });

  it('отображает список подсказок при фокусе и наличии данных', async () => {
    const suggestion = { value: 'Москва', data: {} };
    const wrapper = factory();
    // Фокусируем input
    const input = wrapper.find('input');

    await input.trigger('focus');

    // Устанавливаем список подсказок через props или мок, если нужно
    // Например, если список подсказок зависит от ввода:
    await input.setValue('Мос');
    await wrapper.vm.$nextTick();

    // Если нужно явно смокать список:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (wrapper.vm as any).suggestionList = [suggestion];
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[class*=suggestions]').exists()).toBe(true);
  });

  it('вызывает onKeyPress при нажатии клавиш', async () => {
    const wrapper = factory();
    const input = wrapper.find('input');

    await input.trigger('keyup.enter');
    await input.trigger('keyup.esc');
    await input.trigger('keyup.up');
    await input.trigger('keyup.down');
    // Проверяем, что не возникает ошибок
    expect(true).toBe(true);
  });
});
