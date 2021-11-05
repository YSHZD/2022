
import HG2DMap from '@/utils/2dSdk/HG2DMap.min'
let mixins = {
    data(){
        return {
            MY_MAP: null,
			MAP_URL: '',

            points: [],
			areas: [],
			resouces: [],
			centerDatas:null,

            areaIds:[],//记录所有添加区域
            areaObj:{},//记录所有添加区域

            timer:null,

            flashObj:{}, // 记录闪烁对象

            cardIds:[], // 记录所有添加的定位卡id 
            cardObj:{}, // 记录点位卡

            cardRedStatus:false,
            cardFlashIds:[], //记录闪烁定位卡

            trackIds:[],//记录所有添加轨迹追踪

            baseObj:{},//记录基站

            featureObj:{}, //添加元素

        }
    },
    boforeDestroy(){
        this.clearTimer()
    },
    methods: {
        clearAllDatas(){
            this.clearTimer();
            this.points.splice();
			this.areas.splice();
			this.resouces.splice();
            this.areaIds.splice();
            Object.assign(this.areaObj,{})
            Object.assign(this.flashObj,{})
            Object.assign(this.featureObj,{})
            Object.assign(this.cardObj,{})
            this.cardIds.splice();
            this.cardRedStatus:false,
            this.cardFlashIds.splice();
            this.trackIds.splice();
            Object.assign(this.baseObj,{})
            
            
        },
        clearAll(key){ //清除所有 
			if(key){
                
				let result = this.MY_MAP[key]();
                this.checkCallBack(result, key)
               
                //this.MY_MAP.removeAllCard() 删除所有定位卡
                //this.MY_MAP.removeAllBaseStation() 删除所有基站
                //this.MY_MAP.removeAllZone() 删除所有区域
                //this.MY_MAP.removAllTrack() 删除所有轨迹追踪
               //this.MY_MAP.clearAllTrack() 清除所有轨迹
               //this.MY_MAP.removeAllFeature() 删除所有元素

			}else{
				this.MY_MAP.removeAllFeature();
				this.MY_MAP.removeAllZone();
			}
		},
        

        showCardArr(arr, flag){
            let tempCardArr = arr.filter(item => item.cardId)
            let tempCardIds = tempCardArr.map(item => parseInt(item.cardId)) // 现有的数据

            tempCardIds.forEach( id => {
                if(!this.cardIds.includes(id)){
                    this.addCard(card_id,icon,card_x,card_y,text,options)
                    if(flag){
                        this.addTrack(card_id,points_num = 500,color,dash_dist = 10)
                    }
                }else{
                    this.setCardCoordinate(card_id,card_x,card_y)
                }
            })
            // 原有数据操作
            for(let i = 0; i < this.cardIds.length; i++){
                if(!tempCardIds.includes(this.cardIds[i])){
                    if(flag){  
                        this.removeTrack(card_id)
                        this.clearOneTrack(card_id)
                        this.cardStopFlash(card_id)
                        this.removeCard(card_id)
                    }
                }
            }

            //if(this.cardIds.includes())
        },


        //添加定位卡
        addCard(card_id,icon,card_x,card_y,text,options){
            if(this.checkNumber(card_id) && !this.cardIds.includes(card_id)){
                let result = this.MY_MAP.addCardInfo(card_id,icon,card_x,card_y,text,options)
                if(result){
                    this.cardIds.push(card_id)
                    this.cardObj[card_id] = result
                }
                this.checkCallBack(result, 'addCardInfo=='+ card_id)
            }
        },
        //更新定位卡坐标
        setCardCoordinate(card_id,card_x,card_y){
            if(this.checkNumber(card_id) && this.cardIds.includes(card_id)){
                let result = this.MY_MAP.setCardCoordinate(card_id,card_x,card_y)
                this.checkCallBack(result, 'setCardCoordinate=='+ card_id)
            }
        },
        //更新定位卡图标
        setCardIcon(card_id,icon,options){
            if(this.checkNumber(card_id) && this.cardIds.includes(card_id)){
                let result = this.MY_MAP.setCardIcon(card_id,icon,options)
                this.checkCallBack(result, 'setCardIcon=='+ card_id)
            }
        },
        //更新定位卡的文字
        setCardText(card_id,text){
            if(this.checkNumber(card_id) && this.cardIds.includes(card_id)){
                let result = this.MY_MAP.setCardText(card_id,text)
                this.checkCallBack(result, 'setCardText=='+ card_id)
            }
        },
        //移除定位卡
        removeCard(card_id){
            if(this.checkNumber(card_id) && this.cardIds.includes(card_id)){
                let index = this.cardIds.findIndex(item => item === card_id);
                let result = this.MY_MAP.removeOneCard(card_id)
                if(result){
                    this.cardIds.splice(index, 1); //移除记录
                    delete this.cardObj[card_id]
                }
                this.checkCallBack(result, 'removeOneCard=='+ card_id)
            }
        },


        //添加轨迹追踪 每次更新坐标后，会绘制其轨迹
        addTrack(card_id,points_num = 500,color,dash_dist = 10){
            if(this.checkNumber(card_id) && this.cardIds.includes(card_id) && !this.trackIds.includes(card_id)){
                let result = this.MY_MAP.addTrack(card_id,points_num,color,dash_dist)
                if(result){
                    this.trackIds.push(card_id)    
                }
                this.checkCallBack(result, 'addTrack=='+ card_id)
            }
        },
        //删除轨迹追踪 退出轨迹追踪，并清除地图上的轨迹
        removeTrack(card_id){
            if(this.checkNumber(card_id) && this.cardIds.includes(card_id) && this.trackIds.includes(card_id)){
                let index = this.trackIds.findIndex(item => item === card_id);
                let result = this.MY_MAP.removeOneTrack(card_id)
                if(result){
                    this.trackIds.splice(index, 1); //移除记录
                }
                this.checkCallBack(result, 'removeOneTrack=='+ card_id)
            }
        },
        //清除指定轨迹
        clearOneTrack(card_id){
            if(this.checkNumber(card_id) && this.cardIds.includes(card_id) && this.trackIds.includes(card_id)){
               
                let result = this.MY_MAP.clearOneTrack(card_id)
                this.checkCallBack(result, 'clearOneTrack=='+ card_id)
            }
        },

        //添加基站
        addBaseStation(station_id,icon,station_x,station_y,text,options){
            
            if(this.checkNumber(station_id) && !this.baseObj[station_id]){
                let result = this.MY_MAP.addBaseStation(station_id,icon,station_x,station_y,text,options)
                if(result){
                    this.baseObj[station_id] = result;
                }
                this.checkCallBack(result, 'addBaseStation=='+ station_id)
            }
        },
        //删除指定基站
        removeOneBaseStation(station_id){
            if(this.checkNumber(station_id) && this.baseObj[station_id]){
                
                let result = this.MY_MAP.removeOneBaseStation(station_id)
                if(result){
                    delete this.baseObj[station_id]
                }
                this.checkCallBack(result, 'removeOneBaseStation=='+ station_id)
            }
        },

        checkCallBack(flag, fnName){
            if(!flag){
                this.log(fnName + ' 调用api失败！')
            }
        },
        checkNumber(num){
            if(!num){
                this.log(num + ' 不存在')
                return false;
            }
            if(typeof num !== 'number'){
                this.log(num + ' 类型不是数字')
                return false
            }
            return true
        },
        log(key){
            console.error(key)
        },
        // 初始化地图
		map2dShowInit(key = 'map') {
            var extend = [
                this.centerDatas.coordinate_left,
                this.centerDatas.coordinate_down,
                this.centerDatas.coordinate_right,
                this.centerDatas.coordinate_upper
            ];
            // 调用mapAutomaticSetting函数返回缩放比，中心视点和地图拖拽比
            var obj = this.mapAutomaticSetting(
                this.centerDatas.floor_scaling_ratio,
                this.centerDatas.origin_x,
                this.centerDatas.origin_y,
                this.centerDatas.drop_multiple,
                extend,
                key);
            let rotation = this.centerDatas.rotation;
            if(!this.MY_MAP){
                document.getElementById(key).innerHTML = '';
                this.MY_MAP = new HG2DMap.map(this.MAP_URL, key , obj.center, obj.zoom, 'image', extend, {
                    zoom_factor: 1.5,
                    rotation: rotation,
                    cluster_distance:30,
                    cluster_text_function:this.clusterTextFunction,
                    radius_function:this.radiusFunction,
                    animation_enable:true,
                    animation_cache_time:1.5
                });
                var my_mouse_postion = new HG2DMap.control.mouse_position(); // 调用2d地图SDK中的实例化鼠标坐标工具
                var my_scale_line = new HG2DMap.control.scale_line(); // 调用2d地图SDK中的实例化比例尺工具
                var my_drag_rotate = new HG2DMap.draw.drag_rotate(); // 调用2d地图SDK中的地图旋转
                
                this.MY_MAP.addInteraction(my_drag_rotate); // 调用2d地图SDK中的给地图添加地图旋转
                this.MY_MAP.addControl(my_mouse_postion); // 调用2d地图SDK中的给地图添加鼠标坐标工具
                this.MY_MAP.addControl(my_scale_line); // 调用2d地图SDK中的给地图添加比例尺工具

                this.MY_POPUP = this.MY_MAP.addPopup("popup"); // 调用2d地图SDK中的给地图添加信息悬浮框
                
                this.newMap(this.MY_MAP);

            }else{
                //  重置地图，删除现在地图上所有的元素，包括定位图标，轨迹，区域和绘制
                // 的图形，同时也会将所有定位卡设定为不在轨迹追踪状态，但不会清除已经添加
                // 的绘制工具和地图工具
                let result = this.MY_MAP.reset()
                this.checkCallBack(result, 'reset')

                this.clearAllDatas()
                // 切换显示地图，但不会清除原地图上已有的定位图标，区域，轨迹等元素

                this.MY_MAP.changeMap(this.MAP_URL,  obj.center, obj.zoom, 'image', extend, {
                    zoom_factor: 1.5,
                    rotation: rotation,
                    cluster_distance:30,
                    cluster_text_function:this.clusterTextFunction,
                    radius_function:this.radiusFunction,
                    animation_enable:true,
                    animation_cache_time:1.5
                });
            }
             
        },
        
        newMap(MY_MAP) {

			MY_MAP.on('pointerdown', e => {
				if (e.dragging) {
					return;
				}
				var pixel = MY_MAP.getEventPixel(e.originalEvent); // 调用2d地图SDK中的获得鼠标点击的事件像素
				var hit = MY_MAP.hasFeatureAtPixel(pixel); // 调用2d地图SDK中的判断该像素是否存在图标

				//MY_MAP.getTarget().style.cursor = hit ? 'pointer' : '';

				if (hit) {
					
					// 调用2d地图SDK中的拿到该图标对象
					var feature = MY_MAP.forEachFeatureAtPixel(e.pixel,
					function(feature) {
						return feature;
					});
                    
                    var coordinates = feature.getGeometry().getCoordinates(); // 调用2d地图SDK中的获得坐标

                    if(feature){
                        this.map_click({
                            feature:feature,
                            coordinates:coordinates
                        })
                       
                    }
					console.log(feature)
					
				} 
			});

			MY_MAP.on('pointermove', function(e) {
			});
			// 地图加载进度
			MY_MAP.on('progress', e => {
				//console.log(e)
			});
			MY_MAP.on("animate_move", function(e) {
			});
			// 当地图加载完成后，加载进度条和图标隐藏，初始化其他功能

			MY_MAP.on('loaded', e => {
				this.map_load(e)
			});
		},


        getCenterData(data){
            Object.assign(this.centerDatas, data)
			this.centerDatas = {
				coordinate_down: -11.182719450637281,
				coordinate_left: -17.764190422266303,
				coordinate_right: 7.656009577733698,
				coordinate_upper: 4.22628054936272,
				drag_times: 1,
				floor_id: 1,
				floor_scaling_ratio: "",
				img_atc_height: 15.409,
				img_atc_width: 25.4202,
				img_height: 1159,
				img_url: "/fa132/bg/bwssAttachmentPreview/localPicturePreview?attId=e7281231e416423cb4500770b0078df1",
				img_width: 1912,
				rotation: 0
			}

			
				
		},

        // 显示所有点
		showPointers(){
			let tempFeatures = this.points.map(item => {
				let tempFeature = new HG2DMap.feature.point([item.xCoordUwb, item.yCoordUwb], Object.assign({
					icon: this.getUrl('equip' + item.type),
					text: item.name,
					icon_scale:  1,
					text_scale:  1
				},item.text_color? {
					text_color: item.text_color
				}:null));

				tempFeature.datas = item
				tempFeature.type = 'pointer'
				return tempFeature
			})
			this.MY_MAP.addFeatures(tempFeatures)
		},
		//显示所有区域
		showAreas(){
            this.areaIds.splice(0);

			this.areas.forEach((item,index) => {
				let tempPointes = item.coords.map(item => [parseFloat(item.xCoordUwb),parseFloat(item.yCoordUwb)])
                
                this.addZone(
                    tempPointes,
					this.getID(),
					item.areaName,
					item.color, 
					{'text_color': item.fontColor},
                    item)
					
			})
		},

        //添加区域
        addZone(points_array,id,text,color,options,data){
            if(this.checkNumber(id) && !this.areaIds.includes(id)){
                let tempMap = this.MY_MAP.addZone(tempPointes, id, text, color, options);
				tempMap.type = 'area'
				tempMap.datas = data;
                if(tempMap){
                    this.areaIds.push(id); //添加记录
                    this.areaObj[id] = tempMap;
                }

                this.checkCallBack(tempMap, 'addZone=='+ id)
            }
            
        },
        //删除指定区域
        removeOneZone(id){
            if(this.checkNumber(id) && this.areaIds.includes(id)){
                let index = this.areaIds.findIndex(item => item === id);
                let tempMap = this.MY_MAP.removeOneZone(id);
                if(tempMap){
                    this.areaIds.splice(index, 1);
                    delete this.areaObj[id];
                }
                this.checkCallBack(tempMap, 'removeOneZone=='+ id)
            }
        },
        

        //添加元素
        addFeature(feature, id){
            
            if(!this.featureObj[id]){
                let result = this.MY_MAP.addFeature(feature)
                if(result){
                    this.featureObj[id] = feature;
                }
                this.checkCallBack(result, 'addFeature=='+ id)
            }    
        },
        // 删除指定元素
        removeFeature(id){
            if(this.featureObj[id]){ 
                let result = this.MY_MAP.removeFeature(this.featureObj[id])
                if(result){ 
                    delete this.featureObj[id];
                }
                this.checkCallBack(result, 'removeFeature=='+ id)
            }
        },
        //添加多个元素
        addFeatures(features){
            //addFeatures
        },

		// 显示所有资源点
		showResouces(){
			this.resouces.forEach(item => {
				let tempFeature = new HG2DMap.feature.point([item.xCoordUwb, item.yCoordUwb],{
					icon: this.getUrl(item.type),
					icon_scale:  1
				});
                let id = this.getID(26);
				tempFeature.datas = item
                tempFeature.datasId = id
				tempFeature.type = 'resouce'
				this.addFeature(tempFeature, id);
			})
		},
        // type 区域 area  元素 feature 定位卡 card  基站 base
        flash(id,type){
            this.checkCallBack(['area','feature','card','base'].includes(type), '不存在type 类型')
            if(this[type + 'Obj'][id]){
                if(!this.flashObj[id]){ 
                    let temp = this[type + 'Obj'][id].startFlash()
                    if(temp){
                        this.flashObj[id] = this[type + 'Obj'][id];
                    }
                    this.checkCallBack(temp, type + 'startFlash=='+ id)
                }
            }
        },
       

        //区域停止闪烁 type  同上
        stopFlash(id, type){
            this.checkCallBack(['area','feature','card','base'].includes(type), '不存在type 类型')
            if(this.flashObj[id]){
                let temp =  this.flashObj[id].stopFlash();
                if(temp){
                    delete this.flashObj[id];
                    delete this[type + 'Obj'][id]
                }
                this.checkCallBack(temp, type + 'stopFlash=='+ id)
            }
        },
        /* 替换图标  start */
        //定位闪烁
        cardFlash(id){
            if(this.cardIds.includes(id) && !this.cardFlashIds.includes(id)){
                this.cardFlashIds.push(id);
                this.cardFlash()
            }
        },
        //定位停止闪烁
        cardStopFlash(id){
            if(this.cardFlashIds.includes(id)){
                let index = this.cardFlashIds.findIndex(item => item === id);
                this.cardFlashIds.splice(index, 1);
                this.setCardIcon(card_id,icon,options)
            }
        },

        // 定位定时闪烁
        cardFlash(){
            this.clearTimer()
            if(this.cardFlashIds.length){
                this.timer = setTimeout(()=>{
                    this.cardFlashIds.forEach(card_id => {
                        this.setCardIcon(card_id,this.cardRedStatus?icon:icon,options)
                        this.cardRedStatus = !this.cardRedStatus
                    })
                    this.cardFlash()
                },300)
            }else{
               this.clearTimer() 
            }
        },
         /* 替换图标  end */
		clearTimer(){
            if(this.timer){
                clearTimeout(this.timer)
                this.timer = null;
            }
        },
        mapAutomaticSetting(map_zoom, x, y, times, extend, map_div) {
            var obj = {};
            // 如果缩放比为空
            if (map_zoom == 0) {
                var map_x = parseFloat(Math.abs(parseFloat(extend[2]) - parseFloat(extend[0]))); // 得到地图文件的宽
                var map_y = parseFloat(Math.abs(parseFloat(extend[3]) - parseFloat(extend[0]))); // 得到地图文件的高
                var div_x = parseFloat(this.$refs[map_div].offsetWidth); // 得到显示地图的div的宽
                var div_y = parseFloat(this.$refs[map_div].offsetHeight); // 得到显示地图的div的高
                var max_x = parseFloat(div_x / (map_x * 73)); // 当缩放比为40时，地图1m对应像素值73px,当缩放比加1，对应像素值增加1.5倍。max_x为对应像素值还需要增加或减少多少倍才能等于div的宽度
                var max_y = parseFloat(div_y / (map_y * 73)); // max_y 同理max_x
                var zoom_x = Math.log(max_x) / Math.log(1.5); // 求出地图宽的对应像素值需要增加或减少的倍数值,1.5为地图的缩放比系数zoom_factor,详情可参考2dSDK文档
                var zoom_y = Math.log(max_y) / Math.log(1.5); // 高与宽同理
                obj.zoom = parseFloat(40 + Math.min(zoom_x, zoom_y)).toFixed(2); // 40加上或减去倍数，就是最合适的缩放比
            } else {
                obj.zoom = parseFloat(map_zoom);
            }
            // 如果中心视点为空
            var center_x, center_y, times_drag;
            if (x == null) {
                // 以地图文件的坐标系为原点算出地图文件的中心视点的x值
                center_x = parseFloat(((parseFloat(extend[2]) - parseFloat(extend[0])) / 2 + parseFloat(extend[0])).toFixed(2));
            } else {
                center_x = parseFloat(x);
            }
            if (y == null) {
                // 以地图文件的坐标系为原点算出地图文件的中心视点的y值
                center_y = parseFloat(((parseFloat(extend[3]) - parseFloat(extend[1])) / 2 + parseFloat(extend[1])).toFixed(2));
            } else {
                center_y = parseFloat(y);
            }
            obj.center = [center_x, center_y];
            // 如果拖拽倍数为空
            if (times == null) {
                // 拖拽倍数设为1
                times_drag = 1;
            } else {
                times_drag = parseFloat(times);
            }
            // 计算出限制地图离中心视点拖拽的距离(地图文件宽和高的times_drag倍)的坐标
            var extent = [center_x - times_drag * Math.abs((parseFloat(extend[2]) - parseFloat(extend[0]))), center_y - times_drag * Math.abs((parseFloat(extend[3]) - parseFloat(extend[1]))), center_x + times_drag * Math.abs((parseFloat(extend[2]) - parseFloat(extend[0]))), center_y + times_drag * Math.abs((parseFloat(extend[3]) - parseFloat(extend[1])))];
            obj.extent = extent;
            return obj;
        },
        myTime(val, fmt) {
            var Dates = new Date(parseInt(val));
            var o = {
                'M+': Dates.getMonth() + 1,
                'd+': Dates.getDate(),
                'h+': Dates.getHours(),
                'm+': Dates.getMinutes(),
                's+': Dates.getSeconds(),
                'q+': Math.floor((Dates.getMonth() + 3) / 3),
                'S+': Dates.getMilliseconds()
            }
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (Dates.getFullYear() + '').substring(4 - RegExp.$1.length))
            }
            for (var k in o) {
                if (o.hasOwnProperty(k)) {
                    if (new RegExp('(' + k + ')').test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substring(('' + o[k]).length))
                    }
                }
            }
            return fmt;
        },
        getID = length =>{
            return Number(Math.random().toString().substr(2, length) + Date.now()).toString(36);
        },
        /*显示聚类人数*/
        clusterTextFunction(feature) {
            var features = feature.get('features');
            var size = features.length;
            return size.toString() + "人";
        },
        /*设置聚类图标的半径*/
        radiusFunction(feature) {
            var features = feature.get('features');
            var size = features.length;
            return (20 + size / 2);
        },
        /*
         绘制区域图形转字符串
        */
        fromArrayGetString(array) {
            var string = array.join(" ");
            return string;
        },
        map_click(data){ // 引用页面 重置此方法  监听点击事件
            
        },
        map_load(data){// 引用页面 重置此方法  监听地图加载完成

        },

    }
}

export default mixins