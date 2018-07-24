import Vue from 'vue';
import Router from 'vue-router';
import ChatPage from '@/components/chat-page/index.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'ChatPage',
            component: ChatPage
        }
    ]
});
