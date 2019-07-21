import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const register = r => require.ensure([], () => r(require('@/page/register')), 'register');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const TrainInfoList = r => require.ensure([], () => r(require('@/page/TrainInfoList')), 'TrainInfoList');
const TrainParkingInfo = r => require.ensure([], () => r(require('@/page/TrainParkingInfo')), 'TrainParkingInfo');
const TrainSchedule = r => require.ensure([], () => r(require('@/page/TrainSchedule')), 'TrainSchedule');
const TrainTransfer = r => require.ensure([], () => r(require('@/page/TrainTransfer')), 'TrainTransfer');

const ticketInquiry = r => require.ensure([], () => r(require('@/page/ticketInquiry')), 'ticketInquiry');
const TicketOrder = r => require.ensure([], () => r(require('@/page/TicketOrder')), 'TicketOrder');
const TransferTicketOrder = r => require.ensure([], () => r(require('@/page/TransferTicketOrder')), 'TransferTicketOrder');
const TrainTransferTicketQuery = r => require.ensure([], () => r(require('@/page/TrainTransferTicketQuery')), 'TrainTransferTicketQuery');

const UserInfo = r => require.ensure([], () => r(require('@/page/UserInfo')), 'UserInfo');
const ChangeUserInfo = r => require.ensure([], () => r(require('@/page/ChangeUserInfo')), 'ChangeUserInfo');

const ChangePassword = r => require.ensure([], () => r(require('@/page/ChangePassword')), 'ChangePassword');

const PassengerInfo = r => require.ensure([], () => r(require('@/page/PassengerInfo')), 'PassengerInfo');

const AddPassenger = r => require.ensure([], () => r(require('@/page/AddPassenger')), 'AddPassenger');

const AllOrderList = r => require.ensure([], () => r(require('@/page/AllOrderList')), 'AllOrderList');
const NoTripOrderList = r => require.ensure([], () => r(require('@/page/NoTripOrderList')), 'NoTripOrderList');

const NoPayOrderList = r => require.ensure([], () => r(require('@/page/NoPayOrderList')), 'NoPayOrderList');

const TicketChange = r => require.ensure([], () => r(require('@/page/TicketChange')), 'TicketChange');
const routes = [
	{
		path: '/',
		component: login
	},
    {
        path: '/register',
        component: register
    },
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/TrainInfoList',
			component: TrainInfoList,
			meta: ['列车信息查询', '列车信息'],
		},{
                path: '/SearchTrainInfo',
                component: TrainParkingInfo,
                meta: ['列车信息查询', '列车时刻表'],
        },{
			path: '/TrainSchedule',
			component: TrainSchedule,
			meta: ['列车信息查询', '列车查询'],
		},{
            path: '/TrainTransfer',
            component: TrainTransfer,
            meta: ['列车信息查询', '接续换乘'],
        },{
			path: '/ticketInquiry',
			component: ticketInquiry,
			meta: ['车票查询及购买', '余票查询'],
		},
            {
                path: '/TrainTransferTicketQuery',
                component: TrainTransferTicketQuery,
                meta: ['车票查询及购买', '接续换乘'],
            },

            {
                path: '/TransferTicketOrder',
                component: TransferTicketOrder,
                meta: ['车票查询及购买', '接续换乘'],
            },{
            path: '/TicketOrder',
            component: TicketOrder,
            meta: ['车票查询及购买', '车票购买'],
        },
            {
                path: '/AllOrderList',
                component: AllOrderList,
                meta: ['订单列表', '全部订单'],
            },
            {
                path: '/NoTripOrderList',
                component: NoTripOrderList,
                meta: ['订单列表', '未出行订单'],
            },
            {
                path: '/NoPayOrderList',
                component: NoPayOrderList,
                meta: ['订单列表', '未支付订单'],
            }
		,{
                path: '/TicketChange',
                component: TicketChange,
                meta: ['订单列表', '订单改签'],
            },{
			path: '/UserInfo',
			component: UserInfo,
			meta: ['个人信息', '个人信息'],
		},{
                path: '/ChangeUserInfo',
                component: ChangeUserInfo,
                meta: ['个人信息', '修改个人信息'],
        }, {
                path: '/ChangePassword',
                component: ChangePassword,
                meta: ['个人信息', '修改密码'],
        }, {
                path: '/PassengerInfo',
                component: PassengerInfo,
                meta: ['个人信息', '乘客信息'],
        },{
                path: '/AddPassenger',
                component: AddPassenger,
                meta: ['个人信息', '添加乘客信息'],
        }]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
