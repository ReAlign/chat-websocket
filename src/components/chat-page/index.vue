<template>
<div class="hello">
    <div class="login-wrap" v-if="!isCheckin">
        <h3 class="m-el-form-title">用户登录</h3>
        <el-form
            ref="form"
            class="m-el-form-login"
            label-width="0"
            :model="form">
            <el-form-item>
                <el-input
                    id="loginName"
                    v-model.trim="form.uname"
                    @keyup.13="login"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="login">
                    登 录
                </el-button>
            </el-form-item>
        </el-form>
    </div>

    <div class="chat-wrap " v-else>
        <h1>多人聊天室（总人数：{{amount}}）</h1>
        <div class="chat-con clearfix" id="chat_con">
            <template v-for="item in msgList">
                <!-- {{item | json}} -->
                <template v-if="item.msgType==0">
                    <p>{{item.message}}</p><br/>
                </template>

                <template v-else>
                    <div
                        class="chat-item item-right clearfix"
                        v-if="form.uname == item.username ">
                        <span class="img fr"></span>
                        <span class="message fr">{{item.message}}</span>
                    </div>
                    <div
                        class="chat-item item-left clearfix rela"
                        v-else>
                        <span class="abs uname">
                            {{item.username}}  ( {{item.msgDate | formatDate}} )
                        </span>
                        <span class="img fl"></span>
                        <span class="fl message">
                            {{item.message}}
                        </span>
                    </div>
                </template>
            </template>
        </div>
        <div class="bottom">
            <input type="text" id="sendtxt" v-model.trim="inputMsg" @keyup.13="sendMessage">
            <button class="sendBtn" @click="sendMessage">发送</button>
        </div>
    </div>
</div>
</template>

<script>
import './style/index.less';

import IO from 'socket.io-client';

import Config from './config';

export default {
    name: 'chat-page',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            amount: 0,
            uname: 'realign',
            form: {
                uname: 'realign'
            },
            inputMsg: '',
            socket: null,
            isCheckin: false,
            msgList: []
        }
    },
    mounted() {
        // const vm = this;

        // vm.socket = IO(Config.WS_URL);

        // vm.socket.on('loginSuccess', (data) => {
        //     if (data.username === vm.form.uname) {
        //         vm.isCheckin = true;
        //     } else {
        //         alert('用户名不匹配，请重试');
        //     }
        // })

        // /*登录失败*/
        // vm.socket.on('loginFail', function () {
        //     alert('昵称重复');
        // })

        // /*监听人数*/
        // vm.socket.on('amountChange', (data) => {
        //     vm.amount = data;
        // })

        // /*接收消息*/
        // vm.socket.on('receiveMessage', (data) => {
        //     console.log('接收到服务端返回：', data)
        //     vm.msgList.push(data);
        //     // vm.showNotify('login', data);

        //     window.scrollTo(0, document.getElementById('chat_con').scrollHeight);
        // })

        // /*新人加入提示*/
        // vm.socket.on('add', function (data) {
        //     console.log(data);
        // })
        // /*退出群聊提示*/
        // vm.socket.on('leave', function (name) {
        //     console.log('退出===', name)
        //     if (name != null) {

        //     }
        // })
    },
    filters: {
        formatDate(d) {
            const date = d ? new Date(d) : new Date();
            const _year = date.getFullYear();
            const _month = date.getMonth() + 1;
            const _day = date.getDate();
            const _hour = date.getHours();
            const _m = date.getMinutes();
            const _min = _m < 10 ? `0${_m}` : _m;
            const _s = date.getSeconds();
            const _second = _s < 10 ? `0${_s}` : _s;

            return `${_year}-${_month}-${_day} ${_hour}:${_min}:${_second}`;
        }
    },
    methods: {
        login() {
            const vm = this;

            if (!vm.form.uname) {
                vm.$notify({
                    title: '系统消息',
                    message: h(
                        'i',
                        {
                            style: 'color: teal'
                        },
                        '请输入昵称'
                    )
                });
                return false;
            }

            // vm.socket.emit('login', {
            //     username: vm.form.uname
            // });
            vm.$notify({
                title: '系统消息',
                message: h(
                    'i',
                    {
                        style: 'color: teal'
                    },
                    ' ￣へ￣ 当前系统不支持在线会话！！！'
                )
            });
        },

        sendMessage() {
            const vm = this;

            if (!vm.inputMsg) {
                alert('请输入……');
                return false;
            }

            vm.socket.emit('sendMessage', {
                username: vm.form.uname,
                message: vm.inputMsg
            });

            vm.inputMsg = '';
        },
        showNotify(type, json) {
            const vm = this;
            const h = vm.$createElement;

            vm.$notify({
                title: `${json.msgTypeDesc || "系统消息"}`,
                message: h(
                    'i',
                    {
                        style: 'color: teal'
                    },
                    `${json.message || ""}`
                )
            });
        }
    }
}
</script>

<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
