<template>
    <div>
        <div class="wrap">
            <div class="user_login">
                <img src="../assets/images/new/login_user_logo.png" alt />
                <p class="loginTitle">体能测试系统</p>
                <div class="input_container">
                    <input
                        type="text"
                        class="inputName"
                        placeholder="用户名"
                        ref="username"
                        @keyup.enter="userLogin"
                        v-model.trim="username"
                    />
                    <div>
                        <input
                            :type="showPwd ? 'text' : 'password'"
                            class="password_class"
                            placeholder="密码"
                            ref="password"
                            @keyup.enter="userLogin"
                            v-model.trim="password"
                        />
                        <img
                            class="password_img"
                            @click="showPwd=!showPwd"
                            :src="showPwd ? require('../assets/images/new/iconeye.png') : require('../assets/images/new/eyes_close.png')"
                            alt
                        />
                    </div>
                    <!-- <div>
            <input type="text" class="input_code" placeholder="验证码" ref="usercode" @keyup.enter="userLogin" v-model.trim="validateCode">
            <div class="code">
              <img v-if="validateCodeImg" class="codeImg" :src="validateCodeImg" alt="验证码" @click="getPictureValidate">
              <div v-else @click="getPictureValidate">获取验证码</div>
            </div>
                    </div>-->
                </div>
                <div>
                    <el-checkbox v-model="checked">记住密码</el-checkbox>
                </div>
                <div class="login_button_container">
                    <el-button type="primary" :loading="loading" @click="userLogin">登 录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import qs from 'qs'
// import md5 from 'js-md5'
    // import { login } from '@/api/index'
    // import axios from 'axios'
    // import host from '@/utils/config'
    export default {
        data () {
            return {
                islogin: true,
                showPwd: false,
                loading: false,
                username: '',
                password: '',
                validateCode: '',
                validateCodeImg: '',
                checked: false,
                dicData: [],
                validateCodeToken: ''
            }
        },
        computed: {
        },
        methods: {
            getPictureValidate () {
                if (!this.username) {
                    this.$message.error('请输入账号')
                    return false
                }
                // let data = {
                //     account: this.username
                // }
            // axios.get(host.host + '/public/createImg', {
            //       responseType: 'arraybuffer',
            //       params: data
            //     }).then(res => {
            //       return 'data:image/png;base64,' + btoa(
            //           new Uint8Array(res)
            //             .reduce((data, byte) => data + String.fromCharCode(byte), '')
            //         )
            //     })
            //     .then(data => {
            //     this.validateCodeImg = data
            //     })
            //     .catch(ex => {
            //       console.error(ex)
            //     })
            },
            userLogin () {
                if (this.username.trim() === '') {
                    this.$message.error('请填写用户名！')
                    return false
                }
                if (this.password.trim() === '') {
                    this.$message.error('请填写密码！')
                    return false
                }
                // if (this.validateCode.trim() === '') {
                //   this.$message.error('请填写验证码！')
                //   return false
                // }
                sessionStorage.setItem('token', '66')
                // login().then(res => {
                //     console.log(res)
                // })
                this.$session.set('userAuthorities',
                                  [
                                      {
                                          name: '首页',
                                          url: '/main'
                                      },
                                      {
                                          name: '系统管理',
                                          children: [
                                              { name: '用户管理', url: '/sysUser', buttons: [{ name: '新增' }, { name: '修改' }] },
                                              { name: '系统日志', url: '/sysLog' }
                                          ]
                                      }
                                  ]
                )
                this.$router.push('/main')
            }
        },
        created () {
        // this.getPictureValidate()
        },
        mounted () {
            console.log('随便一个地方都可以看到', process.env, process.env.NODE_ENV)
            if (localStorage.getItem('userNumber')) {
                this.username = localStorage.getItem('userNumber')
                this.password = localStorage.getItem('password')
                // this.password = window.atob(this.$util.getPaw(localStorage.getItem('password')))
                this.checked = true
            }
            if (!this.username) {
                this.$refs.username.focus()
            } else if (!this.password) {
                this.$refs.password.focus()
            }
        //  else {
        //   this.$refs.usercode.focus()
        // }
        }
    }
</script>
<style scoped>
@import '../assets/styles/login.css';
</style>
