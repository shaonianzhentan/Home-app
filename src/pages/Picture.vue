<template>
    <mu-paper>
    <mu-appbar title="相片">
      <mu-icon-button icon="arrow_back" slot="left" to="/" />
      <mu-icon-menu icon="more_vert" slot="right">
        <mu-menu-item title="添加"  to="/MusicAdd"  />
      </mu-icon-menu>
    </mu-appbar>

<div class="gridlist-demo-container">
  <mu-grid-list class="gridlist-demo">
    <mu-sub-header>图片展示，还没有实现</mu-sub-header>
    <mu-grid-tile v-for="(tile, index) in list" :key="index">
      <img :src="tile.image"/>
      <span slot="title">{{tile.title}}</span>
      <span slot="subTitle">by <b>{{tile.author}}</b></span>
      <mu-icon-button icon="star_border" slot="action"/>
    </mu-grid-tile>
  </mu-grid-list>
</div>

</mu-paper>
</template>

<script>
export default {
  data () {
    return {
      list: [{
        image: '/images/breakfast.jpg',
        title: 'Breakfast',
        author: 'Myron'
      }, {
        image: '/images/burger.jpg',
        title: 'Burger',
        author: 'Linyu'
      }, {
        image: '/images/camera.jpg',
        title: 'Camera',
        author: 'ruolin'
      }, {
        image: '/images/hats.jpg',
        title: 'Hats',
        author: 'kakali'
      }, {
        image: '/images/honey.jpg',
        title: 'Honey',
        author: 'yuyang'
      }, {
        image: '/images/morning.jpg',
        title: 'Morning',
        author: 'mokayi'
      }, {
        image: '/images/vegetables.jpg',
        title: 'Vegetables',
        author: 'NUyyyyyyy'
      }, {
        image: '/images/water-plant.jpg',
        title: 'water',
        author: 'TDDyyyyyyy'
      }]
    }
  }
}
</script>

<style scoped>
.gridlist-demo-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.gridlist-demo{
  width: 500px;
  height: 100%;
  overflow-y: auto;
}
</style>
