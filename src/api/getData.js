import fetch from '@/config/fetch'

/**
 * 登陆注册
 */

export const login = data => fetch('/user/login', data, 'POST');

export const register = data => fetch('/user/register', data, 'POST');

/**
 * 退出
 */

export const signout = () => fetch('/user/signout');

/**
 * 获取用户信息
 */

export const getAdminInfo = data =>      fetch('/user/info',data,'GET');

export const getUserInfo = data => fetch('/user/userinfo',data,'GET');
/**
 * 修改用户信息
 */
export const changeUserInfo = data => fetch('/user/changeuserinfo', data, 'POST');
/**
 *
 *修改密码
 */
export const changePassword= data => fetch('/user/changepassword', data, 'POST');
/**
 *
 * 获取乘客信息
 * @param data
 */
export const getPassengerInfo= data => fetch('/passenger/getPassengerInfo', data);

/**
 * 添加乘客
 * @param data
 */
export const addPassengerInfo= data => fetch('/passenger/addPassengerInfo', data,'POST');

/**
 * 删除乘客
 * @param data
 */
export const deletePassengerInfo= data => fetch('/passenger/deletePassengerInfo', data);

/**
 * 根据起始站和目的站查 查询列车时刻表
 * @param data
 */
export const searchTrainSchedule= data => fetch('/trainSchedule/searchTrainSchedule', data);

/**
 * 查询列车运行的具体时刻
 * @param data
 */
export const getTrainScheduleList= data => fetch('/trainSchedule/getTrainScheduleList', data);

/**
 * 根据起始站和目的站 查询接续换乘的列车
 * @param data
 */
export const searchTransferSchedule= data => fetch('/trainSchedule/searchTransferSchedule', data);


/**
 * 票价查询
 * @param data
 */
export const queryTrainTicket= data => fetch('/query/queryTrainTicket', data);

/**
 *
 * 余票数量查询
 * @param data
 */
export const queryTrainTicketNum= data => fetch('/query/queryTrainTicketNum', data);

/**
 * 接续换乘的余票数量查询
 * @param data
 */
export const queryTransferTrainTicketNum= data => fetch('/query/queryTransferTrainTicketNum', data,'POST');

/**
 * 接续换乘的票价查询
 * @param data
 */
export const queryTrainTransferTicket= data => fetch('/query/queryTrainTransferTicket', data);

/**
 * 预定车票
 * @param data
 */
export const orderTrainTicket= data => fetch('/order/orderTrainTicket', data,'POST');

/**
 * 获取本次的订单信息
 * @param data
 */
export const getOrderList= data => fetch('/order/getOrderList', data);

/**
 * 支付
 * @param data
 */
export const paySuccess= data => fetch('/order/paySuccess', data,'POST');



/**
 * 获取列车总信息
 */

export const getTrainInfoData = data => fetch('/train/traininfo', data);
/**
 * 搜索列车信息
 */

export const SearchTrainInfoData = data => fetch('/train/searchtraininfo', data);

/**
 * 搜索列车经停信息
 * @param data
 * @constructor
 */
export const SearchTrainParkingInfo = data => fetch('/train/searchtrainparkingInfo', data);

/**
 * 查询用户本人的所有订单
 * @param data
 */
export const getAllOrderList = data => fetch('/order/getAllOrderList', data);

/**
 * 查询用户未出行订单
 * @param data
 */
export const getNotripOrderList = data => fetch('/order/getNotripOrderList', data);

/**
 * 查询用户未支付订单
 * @param data
 */
export const getNoPayOrderList = data => fetch('/order/getNoPayOrderList', data);

/**
 * 退票
 * @param data
 */
export const refundTicket = data => fetch('/order/refundTicket', data);

/**
 *
 * 根据乘客身份证号获取乘客信息
 * @param data
 */
export const getPassengerInfoByNumber = data => fetch('/passenger/getPassengerInfoByNumber', data);

/**
 * 订单改签
 * @param data
 */
export const ticketChange = data => fetch('/order/ticketChange', data,'POST');

/**
 * 根据订单号获取订单信息
 * @param data
 */
export const getOrder = data => fetch('/order/getOrder', data,'POST');
/**
 * 获取订单改签结果
 * @param data
 */
export const getOrderChangeResult = data => fetch('/order/getOrderChangeResult', data,);

/**
 * 获取订单金额
 * @param data
 */
export const getOrderMoney = data => fetch('/order/getOrderMoney', data,);


/**
 * 和获取所有车次
 * @param data
 */
export const getAllTrainNumber = data => fetch('/train/getAllTrainNumber', data,);



export const getAllStationName = data => fetch('/train/getAllStationName', data,);
