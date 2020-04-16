<template>
    <el-dialog title="修改密码" class="wd600 change-psw" :visible.sync="dialogVisible" :close-on-click-modal="false">
        <el-form :inline="true" label-width="120px" :rules="rules" :model="form" ref="form">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="原密码" size="mini" prop="oldPassword">
                    <el-input type="password" v-model.trim="form.oldPassword" placeholder="请输入原密码" min="6" maxlength="12"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" size="mini" prop="password">
                    <el-input type="password" v-model.trim="form.password" placeholder="请输入新密码" min="6" maxlength="12"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" size="mini" prop="confirmPsw">
                    <el-input type="password" v-model.trim="form.confirmPsw" placeholder="请再次输入新密码" min="6" maxlength="12"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" class="cancel-btn">取 消</el-button>
            <el-button type="warning" class="success-btn" @click="submitForm('form')" :loading="btnLoading">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        props: {
            dialog: {
                type: Boolean
            }
        },
        data () {
            const validatePsw = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入新密码'))
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    callback()
                }
            }
            return {
                dialogVisible: false,
                form: {
                    oldPassword: '',
                    password: '',
                    confirmPsw: ''
                },
                rules: {
                    oldPassword: [{ required: true, message: '原密码不为空', trigger: 'blur' }],
                    password: [{ required: true, validator: this.$validator.passwordInteger, trigger: 'blur' }],
                    confirmPsw: [{ required: true, validator: validatePsw, trigger: 'blur' }]
                }
            }
        },
        watch: {
            dialogVisible () {
                this.$emit('update:dialog', this.dialogVisible)
            }
        },
        methods: {
            submitForm (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.handleChangePsw()
                    } else {
                        return false
                    }
                })
            },
            // 修改密码
            handleChangePsw () {
                this.btnLoading = true
                // editPassword({
                //     oldPassword: md5(this.form.oldPassword),
                //     password: md5(this.form.password),
                //     confirmPsw: md5(this.form.confirmPsw)
                // }).then(res => {
                //     if (res.code === 200) {
                //         this.$message.success('修改密码成功请重新登入')
                //         this.dialogVisible = false
                //         session.clearAll()
                //         this.$router.push({ path: '/login' })
                //     } else {
                //         this.$message.error(res.message)
                //     }
                //     this.btnLoading = false
                // })
            }
        },
        mounted () {
            this.dialogVisible = this.dialog
        }
    }
</script>
<style lang="scss">
    .change-psw .el-form-item{
        width: 100%;
    }
    .change-psw .el-form-item__content{
        width: 60%;
    }
    .change-psw .el-form-item__content input{
        width: 100%;
    }
</style>
