
const confg_geolocation = {
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition: 'RB'
      };

export function getMap( id, configs) {
	var map = new AMap.Map(id, configs);
    return map;
}

export function geolocation() {
	var mapgeolocation = new AMap.Geolocation(confg_geolocation);
	return mapgeolocation;
}

export default{
	getMapBase( id, configs) {
       return getMap( id, configs);
    },
    getGeolocation() {
    	return geolocation();
    }
}