
import Vue from 'vue';
import Oneone from './Oneone.vue';
let OneConstructor = Vue.extend(Oneone);
let instance;

const showOne = function (message = "通知内容", char = "default", posi = "left") {
    instance = new OneConstructor({
        data: {
            message,
            char,
            posi
        }
    });
    instance.$mount();
    document.body.appendChild(instance.$el);
    return instance;
}

export default showOne

