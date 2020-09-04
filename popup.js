// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


function getKeywordsFromPage(source, keywords){
  source = source.toLowerCase();
  const includes = {};
  for (const [key, value] of Object.entries(keywords)) {
    if(source.includes(key.toLowerCase())){
      includes[key] = value;
    }
  }
  return includes; 
}

function getKeywords(callback) {
  // chrome.storage.sync.get('keywords', function(data) {
  //   callback(data);
  // });
  return {
    'w-2': { description: 'Looking for information about generating W-2s?', subtitle: 'Checkout the Namely knowledge base', links: [
        {title: "How to Generate your company W2s?", url: "https://community.namely.com/articles/Knowledge/How-to-Generate-a-W-2-Preview-Report?r=897&ui-knowledge-components-aura-actions.KnowledgeArticleVersionCreateDraftFromOnlineAction.createDraftFromOnlineArticle=1&ui-force-components-controllers-detail.Detail.getEntityConfig=1&ui-force-components-controllers-recordGlobalValueProvider.RecordGvp.getRecord=2&ui-knowledge-components-aura-controller.ArticleThumbVote.refreshVoteStats=1"},
        {title: "Employee Guide to the Form W-2", url: "https://community.namely.com/s/article/Employee-Guide-to-the-Form-W-2"}
      ]
      },
    'Tax Deferral': { description: 'Need help understanding the COVID-19: Tax Deferral Waiver?', subtitle: 'The Namely Experts are here to help!', links: [
      {title: "COVID-19: Tax Deferral Waiver", url: "https://community.namely.com/s/article/COVID-19-Tax-Deferral-Waiver"},
      {title: "COVID-19: Employer Social Security Payment Deferrals", url: "https://community.namely.com/s/article/COVID-19-Employer-Social-Security-Payment-Deferrals"}
    ]
    },
    'Open Enrollment': { description: 'All the information you need for Open Enrollment', subtitle: 'Including the new Passive Open Enrollment feature', links: [
      {title: "Benefit Mapping for Passive Open Enrollment", url: "https://community.namely.com/s/article/Benefit-Mapping-for-Passive-Open-Enrollment"},
      {title: "Using the Open Enrollment Dashboard", url: "https://community.namely.com/s/article/Open-Enrollment-Dashboard"}
    ]
    }
  }
}

function createNode(type, text){
  var tag = document.createElement(type);
  var text = document.createTextNode(text);
  tag.appendChild(text);
  return tag; 
}

function createLink(text, url){
  var a = document.createElement('a');
  var linkText = document.createTextNode(text);
  a.appendChild(linkText);
  a.title = text;
  a.href = url;
  a.target="_blank";
  return a;
}

chrome.runtime.onMessage.addListener(function(request, sender) {

  if (request.action == "getSource") {
    const keywords = getKeywords();
    const keywordsSubset = getKeywordsFromPage(request.source, keywords);
    if(Object.entries(keywordsSubset).length > 0) {
      message.innerText = "";
    }
    for (const [key, value] of Object.entries(keywordsSubset)) {
      message.appendChild(createNode('h1', value.description));
      message.appendChild(createNode('h2', value.subtitle));
      for(let i=0; i < value.links.length; i++) {
        let element = value.links[i];
        let link =  document.createElement('h3').appendChild(createLink(element.title, element.url));
        message.appendChild(link).appendChild(document.createElement('br'));
      }
    }
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

document.addEventListener('DOMContentLoaded', onWindowLoad, false);
