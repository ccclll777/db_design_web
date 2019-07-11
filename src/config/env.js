/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl = '';
let routerMode = 'hash';
let baseImgPath;

if (process.env.NODE_ENV == 'development') {
	baseUrl = 'http://localhost:18080';
    baseImgPath = 'http://b-ssl.duitang.com/uploads/item/201510/08/20151008192345_uPC5U.jpeg';
}else{
	baseUrl = 'http://localhost:18080';
    baseImgPath = 'http://b-ssl.duitang.com/uploads/item/201510/08/20151008192345_uPC5U.jpeg';
}

export {
	baseUrl,
	routerMode,
	baseImgPath
}
