import Vue from 'vue';
import ChatPage from '@/components/chat-page/index.vue';

describe('HelloWorld.vue', () => {
    it('should render correct contents', () => {
        const Constructor = Vue.extend(ChatPage);
        const vm = new Constructor().$mount();
        expect(vm.$el.querySelector('.hello h1').textContent)
            .toEqual('Welcome to Your Vue.js App');
    });
});
