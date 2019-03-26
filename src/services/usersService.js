import store from '../store/store'
import vue from 'vue';

const ADMIN_PATH = '/admin';
const getAuthInfo = function() {
    return axios.get('_k/' + +'/show').then(function(response) {
        let user = response.data
        if (user !== null || user !== undefined) {
            // setUser(user);
            return user
        }
    }.bind(this)).catch(function(res) {
        // console.log(response);
        // dispatch.remove()
    })
}


const getUserInfo = function(username) {
    return axios.get('_k/' + username + '/show').then(function(response) {
        let user = response.data
        if (user !== null || user !== undefined) {
            setAuthUser(user);
            return user
        }
    }.bind(this)).catch(function(res) {
        // console.log(response);
        // dispatch.remove()
    })
}

const getUsers = function() {
    return axios.get('_k/admin/users').then(function(response) {
        let users = response.data

        return users;
    }.bind(this)).catch(function(res) {
        // console.log(response);
        // dispatch.remove()
    })
}
const showUser = function(username) {
    return axios.get('_k/admin/users/' + username).then(function(response) {
        let user = response.data
        setUser(user);
        return user;
    }.bind(this)).catch(function(res) {
        // console.log(response);
        // dispatch.remove()
    })
}

const setUser = function(user) {
    store.dispatch('user/setUser', user)
}
const getAuthUser = function() {
    return store.state.auth.user
}
const getAuthUsername = function() {
    return store.state.auth.user.username
}
export default {
    getUserInfo,
    getAuthUser,
    getUsers,
    showUser,

}
