+ function(m) {

	function Masonry(container, config) {
		//容器放拖拽的元素
		this.container = container;
		//配置对象
		this.config = config;
		//当传入的参数比较多时  就可以考虑设置默认值
		this.config.imgMargin = config.imgMargin || 10;
		//初始化一个数组放高度
		this.arrHeight = [];
		//初始化一个数组放左偏移量
		this.arrLeft = [];
		//为数组添加数据
		this._init();
	}
	Masonry.prototype._init = function() {
		this.container.style.position = "relative";
		for (var i = 0; i < this.config.cols; i++) {
			this.arrHeight.push(0);
			this.arrLeft.push(i * (this.config.imgWidth + this.config.imgMargin));
		}
	};

	//添加元素的方法 并进行瀑布流布局
	Masonry.prototype.appendImg = function(el,eve) {
		/*
		 * 需要存放高度的数组
		 * 初始化数组, 使数组存对应列数的0
		 *       如 :[0, 0, 0]
		 * 从数组中找到最小的, 序号和值
		 * 依照序号放图片
		 * 更新数组
		 * */
		//获取鼠标拖拽图片到容器中的位置 设为图片的初始位置
		var startLeft = eve.pageX - this.container.offsetLeft;
		var startTop = eve.pageY;

		//依照序号放图片
		var oMin = getMin(this.arrHeight);
		this.container.appendChild(el);
		//设置图片的属性
		el.style.position = "absolute";
		//图片的初始位置
		el.style.top = startTop + "px";
		el.style.left = startLeft + "px";
		setTimeout(function(that){
			el.style.top = oMin.value + "px";
			el.style.left = that.arrLeft[oMin.index] + "px";
		},1,this)
		//更新数组
		this.arrHeight[oMin.index] += el.offsetHeight + this.config.imgMargin;

	};
	//从数组中找到最小的，序号和值
	function getMin(arr) {
		var minValue = arr[0];
		var minIndex = 0;
		for (var i = 0; i < arr.length; i++) {
			if (minValue > arr[i]) {
				minValue = arr[i];
				minIndex = i;
			}
		}
		return {
			value: minValue,
			index: minIndex
		};
	}
	m.Masonry = Masonry;

}(window);