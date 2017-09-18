import 'minireset.css'
import './sass/index.scss'

import utils from './js/utils'
import $ from 'jquery'
import $fadeIn from '$fadeIn'
import log from 'log'

const appEl = document.getElementById('app');

let div = document.createElement('div');

div.appendChild(document.createTextNode('Webpack Seed'))

appEl.appendChild(div)

appEl.appendChild(document.createTextNode(utils.genUniqueId()))

$('#app').append('<div>jquery: ' + $().jquery + '<div>')

$.get('/data/abc.json').then((data) => {
  log(data)
})

$fadeIn('#app')

