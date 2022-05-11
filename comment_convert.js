(function() {
  let mutationObserver = new MutationObserver(function() {
    if (document.querySelector("#item-scroller #items").childNodes.length) {
      // コメントが追加された時に動作
      var element = document.querySelector("#item-scroller #items").childNodes[document.querySelector("#item-scroller #items").childNodes.length-1].querySelector("#message");

      // スタンプのみのコメントを除外
      if(element.innerText){
        // 翻訳APIへリクエスト
        var param = encodeURI(element.innerText);
        fetch("https://script.google.com/macros/s/AKfycbzU8mU59MnDvhgnOyCVQITJiLgDztcaElh7zxBXgzOAMUfNx0JZ5xbbXzMIDXFd_cQL/exec?text=" + param, {
          method: "GET",
          redirect: 'follow'
        }).then(response => response.text())
        .then(text => {
          var honyaku = JSON.parse(text).text;
          console.log(honyaku);
          if(element.innerText != honyaku){
            // 翻訳結果を追加
            element.innerHTML += "<br>訳：" + honyaku;
          }
        });
      }
    }
  });

  // 要素の追加を監視
  mutationObserver.observe(
    document.querySelector("#item-scroller #items"),
    {
      childList: true
    }
  );
})();
