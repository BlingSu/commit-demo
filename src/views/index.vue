<template>
    <div class="indexPage">
        <div :class="isCollapse?'menu_box_collapse':'menu_box'">
            <div style="text-align:center;">
                <router-link to="/main" >
                    <img v-if="isCollapse" src="@/assets/images/new/logo.png" class="logo_nav_collapse" alt="">
                    <img v-else src="@/assets/images/new/logo.png" class="logo_nav" alt="">
                </router-link>
                <p class="logo-text">体能测试管理系统</p>
            </div>
            <el-menu
                :default-active="currentRoute"
                class="el-menu-vertical-demo"
                background-color="rgb(233, 238 ,243)"
                text-color="#3C3C3C"
                active-text-color="#327ABF"
                unique-opened
                router
                :collapse="isCollapse"
                :collapse-transition="false">
                    <div v-for="(info,index) in menuList" :key="index" >
                        <el-submenu :index="index+'2'"  v-if="info.children&&info.children.length !== 0">
                            <template slot="title">
                            <!-- <img :src="info.imgs" alt=""> -->
                            <i class="el-icon-location"></i>
                            <span slot="title" v-if="!isCollapse">{{info.name}}</span>
                            </template>
                            <!-- 二级菜单 -->
                            <el-menu-item v-for="(childMenu,key) in info.children" :index="childMenu.url" :key="key+'00'" style="padding-left: 50px !important;">
                            {{childMenu.name}}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :index="info.url">
                            <i class="el-icon-location"></i>
                            <span slot="title">{{info.name}}</span>
                        </el-menu-item>
                    </div>
            </el-menu>
            <img class="hideMenuButton pointer" v-if="!isCollapse" @click="isCollapse = true" src="../assets/images/new/tabLeft.png" alt="">
            <img class="showMenuButton pointer" v-else @click="isCollapse = false" src="../assets/images/new/tabRight.png" alt="">
        </div>
        <div :class="isCollapse?'right_box_collapse':'right_box'">
            <!-- 右侧导航栏 -->
            <div class="header_box">
                <div class="tab_box">
                    <el-tabs
                        v-model="currentTab"
                        @tab-click="handleClickTab"
                        @tab-remove="handleDelTab"
                        closable
                        type="card"
                    >
                        <template v-for="tab in tags">
                            <el-tab-pane
                                :key="tab.url"
                                :label="tab.name"
                                :name="tab.url">
                            </el-tab-pane>
                        </template>
                    </el-tabs>
                </div>
                <div class="user_info">
                    <el-dropdown @command="itemCommand">
                        <span class="el-dropdown-link">
                            欢迎您，陈某某 <i class="el-icon-arrow-down"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="修改密码">修改密码</el-dropdown-item>
                        <el-dropdown-item command="退出">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <router-view class="contentPage"></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                changePswDialog: false, // 修改弹窗
                isCollapse: false, // 是否展开菜单
                currentTab: '/main',
                nickName: '陈某某', // 用户名称
                tags: [{ name: '首页', url: '/main' }], // 标签页列表
                menuList: [],
                menuListData: []
            }
        },
        computed: {
            currentRoute () {
                return this.$route.fullPath
            }
        },
        watch: {
            currentRoute (val) {
                this.currentTab = val
            },
            $route (to, from) {
                let menuListData = this.menuListData
                console.log(menuListData, '准备获取权限按钮')
                // 获取权限按钮数据
                this.menuListData.map(res => {
                    if (to.path === res.url) {
                        sessionStorage.setItem('btnPermissions', JSON.stringify(res.list))
                    }
                })
                let curTag = null
                for (let i = 0; i < menuListData.length; i++) {
                    if (to.path === menuListData[i].url) {
                        curTag = {
                            name: menuListData[i].name,
                            url: to.path
                        }
                    }
                }
                // 如果当前菜单找不到当前url,说明这是个tab页，只需要显示标签头
                if (!curTag) {
                    // 进入彼得详情页，需要把之前的替换掉
                    this.tags.map((item, dex) => {
                        if (item.name === to.name) {
                            this.tags.splice(dex, 1)
                        }
                    })
                    curTag = {
                        name: to.name,
                        url: to.fullPath
                    }
                    this.editableTabsValue = to.fullPath
                }
                let tags = this.tags
                let hash = {}
                tags = [...tags, curTag]
                const newArr = tags.reduce((item, next) => {
                    if (hash[next.name]) {
                        hash[next.name] = ''
                    } else {
                        hash[next.name] = true && item.push(next)
                    }
                    return item
                }, [])
                this.tags = newArr
                sessionStorage.setItem('tags', JSON.stringify(this.tags))
            }
        },
        methods: {
            // 整理菜单列表数据
            handleMenuData () {
                let menuListLength = this.menuList.length
                let menuListData = [{ name: '首页', url: '/main' }]
                for (let i = 0; i < menuListLength; i++) {
                    if (this.menuList[i].children && this.menuList[i].children.length !== 0) { // 有二级菜单
                        let childrenLength = this.menuList[i].children.length
                        for (let j = 0; j < childrenLength; j++) {
                            menuListData.push(this.menuList[i].children[j])
                        }
                    } else { // 无二级菜单
                        menuListData.push(this.menuList[i])
                    }
                }
                this.menuListData = menuListData
            },
            handleSelect (key, keyPath) {
                console.log(key, keyPath)
                this.$router.push('/' + key)
            },
            outLogin () {
                this.$router.push('/login')
            },
            handleClickTab (tab) { // 点击面包屑，跳转到相应路由
                this.$router.push({ path: tab.name })
            },
            // 关闭面包屑
            handleDelTab (path) {
                let tagName
                this.tags.map(item => {
                    if (item.url === path) {
                        tagName = item.name
                    }
                })
                let tab = JSON.parse(sessionStorage.getItem('tags'))
                let tags = []
                for (let i = 0; i < tab.length; i++) {
                    if (tagName === tab[i].name) { // 关闭当前页面的tag
                        if (path === this.currentRoute) {
                            if (i === tab.length - 1) {
                                if (tab.length - 1 !== 0) {
                                    this.$router.push(tab[i - 1].url)
                                }
                            } else {
                                this.$router.push(tab[i + 1].url)
                            }
                        }
                    } else { // 关闭当前tag(不是当前页面的tag)
                        tags.push(tab[i])
                        this.tags = tags
                        sessionStorage.setItem('tags', JSON.stringify(tags))
                    }
                }
            },
            itemCommand (val) {
                if (val === '修改密码') {
                    console.log('修改密码')
                } else {
                    sessionStorage.clear()
                    this.$router.push('/login')
                }
            }
        },
        mounted () {
            this.currentTab = this.$route.fullPath
            this.menuList = this.$session.get('userAuthorities')
            let tags = sessionStorage.getItem('tags')
            if (!tags) {
                this.tags = [{ name: '首页', url: '/main' }]
            } else {
                this.tags = JSON.parse(tags)
            }
            this.handleMenuData()
        }
    }
</script>
<style lang="less">
@import '~@/assets/styles/cover.css';
@import '~@/assets/styles/index.less';
</style>
