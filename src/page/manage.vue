<template>
    <div class="manage_page fillcontain" >
        <meta  http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta  http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <el-row style="height: 100%;">
            <el-col :span="4"  style="min-height: 100%; background-color: #324057;">
                <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
                    <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-document"></i>列车信息查询</template>
                        <el-menu-item index="TrainInfoList">列车信息</el-menu-item>
                        <el-menu-item index="SearchTrainInfo">列车时刻表</el-menu-item>
                        <el-menu-item index="TrainSchedule">列车查询</el-menu-item>
                        <el-menu-item index="TrainTransfer">接续换乘</el-menu-item>
                        <!--<el-menu-item index="foodList">食品列表</el-menu-item>-->
                        <!--<el-menu-item index="orderList">订单列表</el-menu-item>-->

                        <!--<el-menu-item index="adminList">管理员列表</el-menu-item>-->
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-plus"></i>车票查询及购买</template>
                        <el-menu-item index="ticketInquiry">余票查询</el-menu-item>
                        <el-menu-item index="TicketOrder">车票购买</el-menu-item>
                        <el-menu-item index="TrainTransferTicketQuery">接续换乘</el-menu-item>
                        <el-menu-item index="TransferTicketOrder">接续换乘车票购买</el-menu-item>

                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-star-on"></i>订单信息</template>
                        <el-menu-item index="AllOrderList">全部订单</el-menu-item>
                        <el-menu-item index="NoPayOrderList">未支付订单</el-menu-item>
                        <el-menu-item index="NoTripOrderList">未出行订单</el-menu-item>
                        <el-menu-item index="TicketChange">订单改签</el-menu-item>

                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title"><i class="el-icon-setting"></i>个人信息</template>
                        <el-menu-item index="UserInfo">个人信息</el-menu-item>
                        <el-menu-item index="ChangeUserInfo">修改个人信息</el-menu-item>
                        <el-menu-item index="ChangePassword">修改密码</el-menu-item>
                        <el-menu-item index="PassengerInfo">乘客信息</el-menu-item>
                        <el-menu-item index="AddPassenger">添加乘客信息</el-menu-item>
                        <!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->

                    </el-submenu>

                    <!--<el-submenu index="5">-->
                    <!--<template slot="title"><i class="el-icon-edit"></i>编辑</template>-->
                    <!--&lt;!&ndash; <el-menu-item index="uploadImg">上传图片</el-menu-item> &ndash;&gt;-->
                    <!--<el-menu-item index="vueEdit">文本编辑</el-menu-item>-->
                    <!--</el-submenu>-->

                    <!--<el-submenu index="7">-->
                    <!--<template slot="title"><i class="el-icon-warning"></i>说明</template>-->
                    <!--<el-menu-item index="explain">说明</el-menu-item>-->
                    <!--</el-submenu>-->
                </el-menu>
            </el-col>
            <el-col :span="20" style="height: 100%;overflow: auto;">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {

		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{

	}
</style>
