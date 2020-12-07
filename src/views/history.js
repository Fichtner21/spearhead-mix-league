import drive from 'drive-db';
import $ from 'jquery';
import Valine from 'valine';

export function history() {
  (async () => {
    // Load the data from the Drive Spreadsheet
    const historyMatches = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: '4',
    });

    const playersTab = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: '1',
    });

    historyMatches.reverse();

    const teams = historyMatches.map((entry) => entry);

    const newObj = teams.map((obj) => {
      return {
        ...obj,
        t1p1preelo: Number(parseFloat(obj.t1p1preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t1p1preelo, 10).toFixed(2)),
        t1p1postelo: Number(parseFloat(obj.t1p1postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t1p1postelo, 10).toFixed(2)),
        t1p2preelo: Number(parseFloat(obj.t1p2preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t1p2preelo, 10).toFixed(2)),
        t1p2postelo: Number(parseFloat(obj.t1p2postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t1p2postelo, 10).toFixed(2)),
        t1p3preelo: Number(parseFloat(obj.t1p3preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t1p3preelo, 10).toFixed(2)),
        t1p3postelo: Number(parseFloat(obj.t1p3postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t1p3postelo, 10).toFixed(2)),
        t1p4preelo: Number(parseFloat(obj.t1p4preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t1p4preelo, 10).toFixed(2)),
        t1p4postelo: Number(parseFloat(obj.t1p4postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t1p4postelo, 10).toFixed(2)),
        t1p5preelo: Number(parseFloat(obj.t1p5preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t1p5preelo, 10).toFixed(2)),
        t1p5postelo: Number(parseFloat(obj.t1p5postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t1p5postelo, 10).toFixed(2)),
        t2p1preelo: Number(parseFloat(obj.t2p1preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t2p1preelo, 10).toFixed(2)),
        t2p1postelo: Number(parseFloat(obj.t2p1postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t2p1postelo, 10).toFixed(2)),
        t2p2preelo: Number(parseFloat(obj.t2p2preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t2p2preelo, 10).toFixed(2)),
        t2p2postelo: Number(parseFloat(obj.t2p2postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t2p2postelo, 10).toFixed(2)),
        t2p3preelo: Number(parseFloat(obj.t2p3preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t2p3preelo, 10).toFixed(2)),
        t2p3postelo: Number(parseFloat(obj.t2p3postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t2p3postelo, 10).toFixed(2)),
        t2p4preelo: Number(parseFloat(obj.t2p4preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t2p4preelo, 10).toFixed(2)),
        t2p4postelo: Number(parseFloat(obj.t2p4postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t2p4postelo, 10).toFixed(2)),
        t2p5preelo: Number(parseFloat(obj.t2p5preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t2p5preelo, 10).toFixed(2)),
        t2p5postelo: Number(parseFloat(obj.t2p5postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t2p5postelo, 10).toFixed(2)),
      };
    });

    let value = '';

    const playerFromTab = playersTab.map((entry) => entry);
    function addPlayerLink(player) {
      let convertedPlayer = '';
      playerFromTab.forEach((el) => {
        if (player === el.username) {
          convertedPlayer = `<a href="#charts-${el.username}">${el.playername}</a>`;
        } else if (player === '') {
          // console.log('N/A player');
        } else {
          // console.log('Something went wrong.');
        }
      });
      return convertedPlayer;
    }

    newObj.forEach((match, i) => {
      value += `<div class="match" id="match${newObj.length - i}">          
          <div class="date">
            <div class="matchId" id="matchId-${newObj.length - i}">
              <a href="#match-${newObj.length - i}">#${newObj.length - i}</a></div>
            <div class="dateDetail">${match.timestamp}</div>            
              ${
                match.video
                  ? `<a href="#match-${
                      newObj.length - i
                    }" title="Watch movie from match."><div class="matchVideo"><i class="fas fa-film"></i></div></a>`
                  : ''
              }                     
          </div>
          <div class="team">
            <div class="roudswon1">${match.t1roundswon}</div>
            <div class="players">

              <div class="player">
                <div class="preelo">${match.t1p1preelo}</div>
                <div class="name">${addPlayerLink(match.t1p1name)}</div>
                <div class="score">${match.t1p1score}</div>
                <div class="postelo">${match.t1p1postelo}</div>
                <div class="difference">${Number(parseFloat(match.t1p1postelo - match.t1p1preelo).toFixed(2))}
                </div>
              </div>

              <div class="player">
                <div class="preelo">${match.t1p2preelo}</div>
                <div class="name">${addPlayerLink(match.t1p2name)}</div>
                <div class="score">${match.t1p2score}</div>
                <div class="postelo">${match.t1p2postelo}</div>
                <div class="difference">${
                  Number(parseFloat(match.t1p2postelo - match.t1p2preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t1p2postelo - match.t1p2preelo).toFixed(2))
                }
                </div>
              </div>

              <div class="player">
                <div class="preelo">${match.t1p3preelo}</div>
                <div class="name">${addPlayerLink(match.t1p3name)}</div>
                <div class="score">${match.t1p3score}</div>
                <div class="postelo">${match.t1p3postelo}</div>
                <div class="difference">${
                  Number(parseFloat(match.t1p3postelo - match.t1p3preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t1p3postelo - match.t1p3preelo).toFixed(2))
                }
                </div>
              </div>

              <div class="player">
                <div class="preelo">${match.t1p4preelo}</div>
                <div class="name">${addPlayerLink(match.t1p4name)}</div>
                <div class="score">${match.t1p4score}</div>
                <div class="postelo">${match.t1p4postelo}</div>
                <div class="difference">${
                  Number(parseFloat(match.t1p4postelo - match.t1p4preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t1p4postelo - match.t1p4preelo).toFixed(2))
                }
                </div>
              </div>

              <div class="player">
                <div class="preelo">${match.t1p5preelo}</div>
                <div class="name">${addPlayerLink(match.t1p5name)}</div>
                <div class="score">${match.t1p5score}</div>
                <div class="postelo">${match.t1p5postelo}</div>
                <div class="difference">${
                  Number(parseFloat(match.t1p5postelo - match.t1p5preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t1p5postelo - match.t1p5preelo).toFixed(2))
                }
                </div>
              </div>
              
            </div>            
          </div> 
          <div class="team">
            <div class="roudswon2">${match.t2roundswon}</div>
            <div class="players">
               <div class="player">
                <div class="preelo">${match.t2p1preelo}</div>
                <div class="name">${addPlayerLink(match.t2p1name)}</div>
                <div class="score">${match.t2p1score}</div>
                <div class="postelo">${match.t2p1postelo}</div>
                <div class="difference">${
                  Number(parseFloat(match.t2p1postelo - match.t2p1preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t2p1postelo - match.t2p1preelo).toFixed(2))
                }
                </div>
              </div>
              <div class="player">    
                <div class="preelo">${match.t2p2preelo}</div>
                <div class="name">${addPlayerLink(match.t2p2name)}</div>
                <div class="score">${match.t2p2score}</div>
                <div class="postelo">${match.t2p2postelo}</div>
                <div class="difference">${
                  Number(parseFloat(match.t2p2postelo - match.t2p2preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t2p2postelo - match.t2p2preelo).toFixed(2))
                }
                </div>
              </div>
              <div class="player">
                <div class="preelo">${match.t2p3preelo}</div>
                <div class="name">${addPlayerLink(match.t2p3name)}</div>
                <div class="score">${match.t2p3score}</div>
                <div class="postelo">${match.t2p3postelo}</div>
                <div class="difference">${
                  Number(parseFloat(match.t2p3postelo - match.t2p3preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t2p3postelo - match.t2p3preelo).toFixed(2))
                }
                </div>
              </div>
              <div class="player">
                <div class="preelo">${match.t2p4preelo}</div>
                <div class="name">${addPlayerLink(match.t2p4name)}</div>
                <div class="score">${match.t2p4score}</div>
                <div class="postelo">${match.t2p4postelo}</div>
                <div class="difference">${
                  Number(parseFloat(match.t2p4postelo - match.t2p4preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t2p4postelo - match.t2p4preelo).toFixed(2))
                }
                </div>
              </div>
              <div class="player">
                <div class="preelo">${match.t2p5preelo}</div>
                <div class="name">${addPlayerLink(match.t2p5name)}</div>
                <div class="score">${match.t2p5score}</div>
                <div class="postelo">${match.t2p5postelo}</div>
                <div class="difference">${
                  Number(parseFloat(match.t2p5postelo - match.t2p5preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t2p5postelo - match.t2p5preelo).toFixed(2))
                }
                </div>
              </div>  
            </div>           
          </div>
        </div>
       `;
    });

    document.getElementById('matches').innerHTML = value;

    const ourMatches = document.getElementById('our-matches');

    ourMatches.innerHTML += `<span>Matches played</span><img src="./assets/avarage.png"> ${teams.length}`;

    const mainApp2 = document.getElementById('app');
    newObj.forEach((war, i) => {
      const warCard = document.createElement('div');
      warCard.classList.add('container', 'view', 'hidden', 'warcard');
      warCard.setAttribute('id', `match-${newObj.length - i}`);
      const warCardWrapper = document.createElement('div');
      warCardWrapper.classList.add('wrapper');
      warCard.appendChild(warCardWrapper);
      const warCardDetail = document.createElement('div');
      warCardDetail.classList.add('match-detail');
      warCardDetail.innerHTML += `<div class="match-details">
      <div class="">Match #${newObj.length - i}</div>       
      </div>`;
      const iframeMatch = `<iframe
      id="ytplayer"
      type="text/html"
      width="640"
      height="360"
      src="https://www.youtube.com/embed/${war.video}"
      frameborder="0"
      />`;
      const videoResponsive = document.createElement('div');
      videoResponsive.classList.add('video-responsive');
      warCardDetail.appendChild(videoResponsive);
      if (war.video) {
        videoResponsive.innerHTML += iframeMatch;
      } else {
        videoResponsive.innerHTML += `No movie.`;
      }
      warCardWrapper.appendChild(warCardDetail);

      mainApp2.appendChild(warCard);
      function enableRouteWar() {
        function setRoute() {
          $('.view').hide();
          const { hash } = window.location;
          if (hash === '') {
            $('#home').show();
          }
          $(hash).show();
        }
        setRoute();
        window.addEventListener('hashchange', setRoute);
      }
      enableRouteWar();
    });

    // const valineComments = () => {
    //   newObj.forEach((comm, index) => {
    //     console.log('COMM', comm);
    //   });
    // };

    // const allMatches = document.querySelectorAll('.match');
    // allMatches.forEach((match, index) => {
    //   // console.log('MATCH', match);
    //   const formValine = document.createElement('form');
    //   formValine.classList.add('formValine');
    //   formValine.setAttribute('onsubmit', 'event.preventDefault();');

    //   const formValineDiv = document.querySelector('.formValine');
    //   const textareaValine = document.createElement('textarea');
    //   textareaValine.setAttribute('name', 'joinDiscussion');
    //   textareaValine.setAttribute('id', 'joinDiscussion');
    //   textareaValine.setAttribute('placeholder', 'Write a comment');
    //   const postComment = document.createElement('div');
    //   postComment.setAttribute('id', 'postComment');
    //   const labelUser = document.createElement('label');
    //   labelUser.innerHTML += 'Your Name: ';
    //   const inputUserName = document.createElement('input');
    //   inputUserName.setAttribute('type', 'input');
    //   inputUserName.setAttribute('id', 'userName');
    //   const inputPost = document.createElement('input');
    //   inputPost.setAttribute('type', 'button');
    //   inputPost.setAttribute('value', 'Post');
    //   inputPost.setAttribute('id', 'post');
    //   const sectionComments = document.createElement('section');
    //   sectionComments.setAttribute('id', 'viewComments');
    //   formValine.appendChild(textareaValine);
    //   formValine.appendChild(postComment);
    //   postComment.appendChild(labelUser);
    //   postComment.appendChild(inputUserName);
    //   postComment.appendChild(inputPost);
    //   formValine.appendChild(sectionComments);

    //   // formValues += `<form onsubmit="event.preventDefault();">
    //   // <textarea name="joinDiscussion" id="joinDiscussion" cols=50 placeholder="Join the discussion"></textarea>
    //   //           <div id="postComment">
    //   //             <label>UserName:</label><input type="input" id="userName"/>
    //   //             <input type="button" value="Post" id="post">
    //   //           </div>
    //   //           <section id="viewComments">
    //   //      </section>
    //   // </form>`;

    //   const elem = document.getElementById(`match${index}`);

    //   match.appendChild(formValine);
    //   new Valine({
    //     el: `.valine`,
    //     appId: 'GbCaRUpGLOl1IN6vCnIwMcle-MdYXbMMI',
    //     appKey: '3YW20TtAKRS89UlzqcMUPQcO',
    //     lang: 'en',
    //     path: elem,
    //   });
    // });

    // (function () {
    // function Comment(userName, text, votes, commentList) {
    //   this.userName = userName;
    //   this.text = text;
    //   this.votes = votes;
    //   this.commentList = commentList;
    // }

    // Comment.prototype.upvote = function () {
    //   let commentList = JSON.parse(window.localStorage.getItem('commentList')) || [];
    //   this.votes = this.votes + 1;
    //   commentList = findAndUpdateComment(commentList, this);
    //   createCommentView(commentList);
    // };

    // Comment.prototype.downvote = function () {
    //   let commentList = JSON.parse(window.localStorage.getItem('commentList')) || [];
    //   if (this.votes > 0) this.votes = this.votes - 1;
    //   commentList = findAndUpdateComment(commentList, this);
    //   createCommentView(commentList);
    // };

    // Comment.prototype.reply = function (userName, text) {
    //   const reply = new Comment(userName, text, 0, []);
    //   this.commentList.push(reply);
    // };

    // Comment.prototype.save = function () {
    //   const commentList = JSON.parse(window.localStorage.getItem('commentList')) || [];
    //   commentList.push(this);
    //   createCommentView(commentList);
    // };

    // Comment.prototype.updateReplyList = function () {
    //   let commentList = JSON.parse(window.localStorage.getItem('commentList')) || [];
    //   // search for that comment in the list
    //   commentList = findAndUpdateComment(commentList, this);
    //   createCommentView(commentList);
    // };

    // function findAndUpdateComment(commentList, comment) {
    //   for (let i = 0; i < commentList.length; i++) {
    //     if (commentList[i].text === comment.text && commentList[i].userName === comment.userName) commentList[i] = comment;
    //     if (commentList[i].commentList.length > 0) findAndUpdateComment(commentList[i].commentList, comment);
    //   }
    //   return commentList;
    // }

    // function createCommentView(commentList) {
    //   const docFrag = document.createDocumentFragment();
    //   docFrag.appendChild(showComments(commentList));
    //   document.getElementById('viewComments').innerHTML = '';
    //   document.getElementById('viewComments').appendChild(docFrag);
    //   window.localStorage.setItem('commentList', JSON.stringify(commentList));
    // }

    // function createComment(userName, text, votes) {
    //   const comment = new Comment(userName, text, votes, []);
    //   comment.save();
    //   return comment;
    // }

    // function showComments(commentList) {
    //   const mainUL = document.createElement('ul');
    //   for (let i = 0; i < commentList.length; i++) {
    //     const comment = new Comment(commentList[i].userName, commentList[i].text, commentList[i].votes, commentList[i].commentList);
    //     const li = createLi(comment, i);
    //     mainUL.appendChild(li);
    //     if (commentList[i].commentList.length > 0) {
    //       mainUL.appendChild(showComments(commentList[i].commentList));
    //     }
    //   }
    //   return mainUL;
    // }

    // function createLi(comment, index) {
    //   // main li element
    //   const li = document.createElement('li');

    //   // main div for the li element
    //   const mainDiv = document.createElement('div');

    //   // commentDiv which will have comment and username
    //   const commentDiv = document.createElement('div');
    //   const commentNameAndText = document.createTextNode(comment.userName + ': ' + comment.text);
    //   commentDiv.appendChild(commentNameAndText);

    //   // votes div which will have votes along with upvote and downvote
    //   const votesDiv = document.createElement('div');
    //   const votes = document.createTextNode('Votes:' + comment.votes);
    //   const upvoteBtn = document.createElement('button');
    //   upvoteBtn.innerHTML = 'Upvote';
    //   upvoteBtn.onclick = function () {
    //     comment.upvote();
    //   };
    //   const downVoteBtn = document.createElement('button');
    //   downVoteBtn.innerHTML = 'Downvote';

    //   downVoteBtn.onclick = function () {
    //     comment.downvote();
    //   };
    //   votesDiv.appendChild(votes);
    //   votesDiv.appendChild(upvoteBtn);
    //   votesDiv.appendChild(downVoteBtn);

    //   // reply username div
    //   const userNameDiv = document.createElement('div');
    //   const userName = document.createTextNode('Username:');
    //   const usernameInput = document.createElement('input');
    //   userNameDiv.appendChild(userName);
    //   userNameDiv.appendChild(usernameInput);

    //   // reply comment div
    //   const replyCommentDiv = document.createElement('div');
    //   const commentText = document.createTextNode('Comment:');
    //   const commentInput = document.createElement('input');
    //   replyCommentDiv.appendChild(commentText);
    //   replyCommentDiv.appendChild(commentInput);

    //   // reply post button which will create a new comment

    //   const postReplyBtn = document.createElement('button');
    //   postReplyBtn.innerHTML = 'POST';
    //   postReplyBtn.onclick = function () {
    //     const content = commentInput.value;
    //     const user = usernameInput.value;
    //     const reply = new Comment(user, content, 0, []);
    //     comment.commentList.push(reply);
    //     comment.updateReplyList();
    //   };

    //   // reply Div which will show up on click of reply button
    //   const replyDiv = document.createElement('div');

    //   const hiddenReplyDiv = document.createElement('div');
    //   hiddenReplyDiv.style.cssText = 'display:none';
    //   hiddenReplyDiv.appendChild(userNameDiv);
    //   hiddenReplyDiv.appendChild(replyCommentDiv);
    //   hiddenReplyDiv.appendChild(postReplyBtn);

    //   const replyBtn = document.createElement('button');
    //   replyBtn.innerHTML = 'Reply';
    //   replyBtn.onclick = function () {
    //     replyBtn.style.cssText = 'display:none';
    //     hiddenReplyDiv.style.cssText = 'display:block';
    //   };
    //   replyDiv.appendChild(replyBtn);
    //   replyDiv.appendChild(hiddenReplyDiv);

    //   mainDiv.appendChild(commentDiv);
    //   mainDiv.appendChild(votesDiv);
    //   mainDiv.appendChild(replyDiv);
    //   li.appendChild(mainDiv);
    //   return li;
    // }

    // document.getElementById('post').addEventListener('click', function () {
    //   const userName = document.getElementById('userName').value;
    //   const content = document.getElementById('joinDiscussion').value;
    //   createComment(userName, content, 0);
    // });

    // const commentList = JSON.parse(window.localStorage.getItem('commentList')) || [];
    // if (commentList.length) createCommentView(commentList);
    // })();

    const matchNodeList = document.querySelectorAll('.match');
    const matchArr = Array.prototype.slice.call(matchNodeList);
    for (let i = 0; i < matchArr.length; i++) {
      const resultT1 = Number(parseInt(matchArr[i].children[1].children[0].innerHTML, 10));
      const resultT2 = Number(parseInt(matchArr[i].children[2].children[0].innerHTML, 10));

      const parentResultT1 = matchArr[i].children[1];
      const parentResultT2 = matchArr[i].children[2];

      if (resultT1 > resultT2) {
        parentResultT1.classList.add('bg__green');
        parentResultT2.classList.add('bg__red');
      } else if (resultT1 < resultT2) {
        parentResultT1.classList.add('bg__red');
        parentResultT2.classList.add('bg__green');
      } else {
        parentResultT1.classList.add('bg__gray');
        parentResultT2.classList.add('bg__gray');
      }
    }

    const diff = document.querySelectorAll('.difference');
    diff.forEach(function (elem) {
      if (Number(parseFloat(elem.innerHTML)) > 0) {
        elem.classList.add('won');
      } else if (Number(parseFloat(elem.innerHTML)) < 0) {
        elem.classList.add('lost');
      } else {
        // nie dodawaj nic
      }
    });

    const pageSize = 10;
    let incremSlide = 11;
    let startPage = 0;
    let numberPage = 0;

    const pageCount = $('.match').length / pageSize;
    const totalSlidepPage = Math.floor(pageCount / incremSlide);

    for (let i = 0; i < pageCount; i++) {
      $('#pagin').append('<li><a href="#history">' + (i + 1) + '</a></li>');
      if (i > pageSize) {
        $('#pagin li').eq(i).hide();
      }
    }

    const prev = $('<li/>')
      .addClass('prev')
      .html('Prev')
      .click(function () {
        startPage -= 5;
        incremSlide -= 5;
        numberPage--;
        slide();
      });
    prev.hide();

    const next = $('<li/>')
      .addClass('next')
      .html('Next')
      .click(function () {
        startPage += 5;
        incremSlide += 5;
        numberPage++;
        slide();
      });

    $('#pagin').prepend(prev).append(next);

    $('#pagin li').first().find('a').addClass('current');

    let slide = function (sens) {
      $('#pagin li').hide();

      for (let t = startPage; t < incremSlide; t++) {
        $('#pagin li')
          .eq(t + 1)
          .show();
      }

      if (startPage === 0) {
        next.show();
        prev.hide();
      } else if (numberPage === totalSlidepPage) {
        next.hide();
        prev.show();
      } else {
        next.show();
        prev.show();
      }
    };

    const showPage = function (page) {
      $('.match').hide();
      $('.match').each(function (n) {
        if (n >= pageSize * (page - 1) && n < pageSize * page) $(this).show();
      });
    };

    showPage(1);
    $('#pagin li a').eq(0).addClass('current');

    $('#pagin li a').click(function () {
      $('#pagin li a').removeClass('current');
      $(this).addClass('current');
      showPage(parseInt($(this).text(), 10));
    });
  })();
}
