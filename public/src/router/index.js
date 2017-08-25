import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import MyTunes from '@/components/MyTunes'
import Playlist from '@/components/Playlist'

Vue.use(Router)

export default new Router({
	routes: [
		{ path: '/', name: 'Home', component: Home },
		{ path: '/MyTunes', component: MyTunes, children: [{ path: '/', name: 'MyTunes.Playlists', component: Playlist }] },
		// { path: '/posts/:postId', name: 'Post', component: Post }
	]
})
