
import Vue from 'vue';
import Main from './main.vue';
import { PopupManager } from 'element-ui/src/utils/popup';
import { isVNode } from 'element-ui/src/utils/vdom';
import { isObject } from 'element-ui/src/utils/types';
let MessageConstructor = Vue.extend(Main);

let instance;
let instances = [];
let seed = 1;

const Message = function (options) {  // 调用这个方法，显示消息
  if (Vue.prototype.$isServer) return;  // Vue构造函数的显示原型上的那个$isServer属性
  options = options || {};  // 传入字符串，若为空，则为一个对象
  if (typeof options === 'string') {  // 经过上面的赋值，若字符串不为空，则为真
    options = {
      message: options
    };
  }  // 现在options肯定是一个对象
  let userOnClose = options.onClose; // 不一定有onClose，要看这个方法调用时传的options
  let id = 'message_' + seed++; // 例如message_2，可能有多个消息组件

  options.onClose = function () {
    Message.close(id, userOnClose); // 关闭某个消息组件
  };
  instance = new MessageConstructor({ // 生成一个那个消息组件的实例，里面的data对象是这个，并且挂载？？？
    data: options
  });
  instance.id = id; // 那个实例上追加一个属性id，对应那个消息组件
  if (isVNode(instance.message)) { // 实例上面的message？？？是否是一个虚拟dom
    instance.$slots.default = [instance.message];
    instance.message = null;
  }
  instance.$mount(); // 挂载到一个元素？？？上
  document.body.appendChild(instance.$el); // 开始把消息组件放到body尾端了
  let verticalOffset = options.offset || 20; //距离位置
  instances.forEach(item => { // 应该是这个instances数组里面有所有的消息组件吧
    verticalOffset += item.$el.offsetHeight + 16; // 每个消息组件距离上方的距离叠加
  });
  instance.verticalOffset = verticalOffset; // 当前那个消息组件实例里面的verticalOffset
  instance.visible = true;
  instance.$el.style.zIndex = PopupManager.nextZIndex(); // 其它js模块里面的nextZIndex方法
  instances.push(instance); // 当前那个消息组件实例放进去
  return instance;
};

['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = (options) => {
    if (isObject(options) && !isVNode(options)) {
      return Message({
        ...options,
        type
      });
    }
    return Message({
      type,
      message: options
    });
  };
});

Message.close = function (id, userOnClose) { // 函数对象上面的关闭方法
  let len = instances.length;
  let index = -1;
  let removedHeight;
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      removedHeight = instances[i].$el.offsetHeight;
      index = i;
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
  if (len <= 1 || index === -1 || index > instances.length - 1) return;
  for (let i = index; i < len - 1; i++) {
    let dom = instances[i].$el;
    dom.style['top'] =
      parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px';
  }
};

Message.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};

export default Message;

