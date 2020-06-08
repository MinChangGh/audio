<template>
	<div>
		<div id="allmap"></div>
	</div>
</template>

<script>
	export default {
		name: "jsonp",
		data() {
			return {

			}
		},
		computed: {},
		components: {

		},
		beforeDestroy() {

		},
		created() {


		},
		mounted() {
			setTimeout (()=>{
				this.init2()
			},2000)
		
		},

		methods: {
			init2 () {
	
				// 百度地图API功能
				var map = new BMap.Map("allmap");
				var point = new BMap.Point(116.331398, 39.897445);
				map.centerAndZoom(point, 30);
				// 将标注添加到地图中
				
				var geolocation = new BMap.Geolocation();
				var options = {
					onSearchComplete: (results) => {
				
						// 判断状态是否正确
				
						if (local.getStatus() == 0) {
							console.log(results)
							// local.search(r.point)
							//console.log(results.getPoi(0).address); // 这就是我们想要的地址啦！
				
						} else {
				
							alert('没有搜索到该地址！')
				
						}
				
					}
				
				};
				
				
				var local = new BMap.LocalSearch(map, options);
				
				geolocation.getCurrentPosition(function(r) {
					var mk = new BMap.Marker(r.point);
					if (this.getStatus() == BMAP_STATUS_SUCCESS) {
						map.addOverlay(mk);
						map.panTo(r.point);
						map.addEventListener('ondragend', function() {
							// alert('ds')
							mk.setPosition(map.getCenter())
							// throttle(mk.setPosition(map.getCenter()), 100)
							// local.search(r.point)
				
						});
						//   地图停止移动后获取mk经纬度
						map.addEventListener('moveend', function() {
				
							var pos = mk.getPosition();
							//  console.log(pos);  
							// 创建地址解析对象
							var geoc = new BMap.Geocoder();
							geoc.getLocation(pos, function(rs) {
								var addComp = rs.addressComponents;
								// alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
							});
				
						})
						//console.log(pos);
						// alert('您的位置：'+r.point.lng+','+r.point.lat);
					} else {
						//alert('failed'+this.getStatus());
					}
				
				
				
				}, {
					enableHighAccuracy: true
				})
				//关于状态码
				//BMAP_STATUS_SUCCESS    检索成功。对应数值“0”。
				//BMAP_STATUS_CITY_LIST    城市列表。对应数值“1”。
				//BMAP_STATUS_UNKNOWN_LOCATION    位置结果未知。对应数值“2”。
				//BMAP_STATUS_UNKNOWN_ROUTE    导航结果未知。对应数值“3”。
				//BMAP_STATUS_INVALID_KEY    非法密钥。对应数值“4”。
				//BMAP_STATUS_INVALID_REQUEST    非法请求。对应数值“5”。
				//BMAP_STATUS_PERMISSION_DENIED    没有权限。对应数值“6”。(自 1.1 新增)
				//BMAP_STATUS_SERVICE_UNAVAILABLE    服务不可用。对应数值“7”。(自 1.1 新增)
				//BMAP_STATUS_TIMEOUT    超时。对应数值“8”。(自 1.1 新增)
			}, 
			init () {
				  var sContent =
				"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>天安门</h4>" +
				"<img style='float:right;margin:4px' id='imgDemo' src='../img/tianAnMen.jpg' width='139' height='104' title='天安门'/>" +
				"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门...</p>" +
				"</div>";
				let map = new BMap.Map("#map");   // 创建Map实例
				var point = new BMap.Point(116.404, 39.915);
				map.centerAndZoom(point, 350);
				var marker = new BMap.Marker(point);  // 创建标注
				var infoWindow = new BMap.InfoWindow(sContent);
				map.addOverlay(marker);               // 将标注添加到地图中
				marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
				map.addEventListener("moveend",function(){
				  if(marker){
				    marker.setPosition(map.getCenter());
				    // map.openInfoWindow(infoWindow,point);
				  }
				
				});
				map.addEventListener("zoomend",function(){
				  if(marker){
				    marker.setPosition(map.getCenter());
				  }
				});
				marker.addEventListener("click", function(){
				  this.openInfoWindow(infoWindow);
				  //图片加载完毕重绘infowindow
				  document.getElementById('imgDemo').onload = function (){
				    infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
				  }
				});
			}

		}

	}
</script>

<style  lang="less">
	#allmap {
		width: 100%;
		height: 400px;
	}
	// @r: 22.09rem
	// #map {
	// 	width: 100%;
	// 	height: 200px;
	// }
		
	
</style>
