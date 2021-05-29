import Vue from 'vue';
import FeedCard from '../../../components/TwitterCards/Feed/FeedCard.vue'

const app = new Vue({
    el: '#app',
    render: createElement => createElement(FeedCard)
});