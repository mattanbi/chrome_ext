// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function setStorage() {
  chrome.storage.sync.set({color: item}, function() {
    console.log('color is ' + item);
  })
}


function addItem() { 
  var list = document.getElementById('list');
  var inputField = document.getElementById('inputItem');
  var listItem = document.createElement("li");
  listItem.innerText = inputField.value; // passed the field. 
  list.appendChild(listItem);
  return false; // stop submission
}