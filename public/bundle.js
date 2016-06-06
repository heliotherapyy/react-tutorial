/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Comment = function (_React$Component) {
	  _inherits(Comment, _React$Component);

	  function Comment() {
	    _classCallCheck(this, Comment);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Comment).apply(this, arguments));
	  }

	  _createClass(Comment, [{
	    key: "rawMarkup",
	    value: function rawMarkup() {
	      var md = new Remarkable();
	      var rawMarkup = md.render(this.props.children.toString());
	      return { __html: rawMarkup };
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "div",
	        { className: "comment" },
	        React.createElement(
	          "h2",
	          { className: "commentAuthor" },
	          this.props.author
	        ),
	        React.createElement("span", { dangerouslySetInnerHTML: this.rawMarkup() })
	      );
	    }
	  }]);

	  return Comment;
	}(React.Component);

	var CommentBox = function (_React$Component2) {
	  _inherits(CommentBox, _React$Component2);

	  function CommentBox(props) {
	    _classCallCheck(this, CommentBox);

	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(CommentBox).call(this, props));

	    _this2.state = { data: [] };
	    _this2.handleCommentSubmit = _this2.handleCommentSubmit.bind(_this2);
	    _this2.loadCommentsFromServer = _this2.loadCommentsFromServer.bind(_this2);
	    return _this2;
	  }

	  _createClass(CommentBox, [{
	    key: "loadCommentsFromServer",
	    value: function loadCommentsFromServer() {
	      var that = this;
	      $.ajax({
	        url: that.props.url,
	        dataType: 'json',
	        cache: false,
	        success: function (data) {
	          this.setState({ data: data });
	        }.bind(this),
	        error: function (xhr, status, err) {
	          console.error(this.props.url, status, err.toString());
	        }.bind(this)
	      });
	    }
	  }, {
	    key: "handleCommentSubmit",
	    value: function handleCommentSubmit(comment) {
	      var comments = this.state.data;
	      // Optimistically set an id on the new comment. It will be replaced by an
	      // id generated by the server. In a production application you would likely
	      // not use Date.now() for this and would have a more robust system in place.
	      comment.id = Date.now();
	      var newComments = comments.concat([comment]);
	      this.setState({ data: newComments });
	      var that = this;
	      $.ajax({
	        url: that.props.url,
	        dataType: 'json',
	        type: 'POST',
	        data: comment,
	        success: function (data) {
	          this.setState({ data: data });
	        }.bind(this),
	        error: function (xhr, status, err) {
	          this.setState({ data: comments });
	          console.error(this.props.url, status, err.toString());
	        }.bind(this)
	      });
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.loadCommentsFromServer();
	      setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "div",
	        { className: "commentBox" },
	        React.createElement(
	          "h1",
	          null,
	          "Comments"
	        ),
	        React.createElement(CommentList, { data: this.state.data }),
	        React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit })
	      );
	    }
	  }]);

	  return CommentBox;
	}(React.Component);

	;

	var CommentList = function (_React$Component3) {
	  _inherits(CommentList, _React$Component3);

	  function CommentList() {
	    _classCallCheck(this, CommentList);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(CommentList).apply(this, arguments));
	  }

	  _createClass(CommentList, [{
	    key: "render",
	    value: function render() {
	      var commentNodes = this.props.data.map(function (comment) {
	        return React.createElement(
	          Comment,
	          { author: comment.author, key: comment.id },
	          comment.text
	        );
	      });
	      return React.createElement(
	        "div",
	        { className: "commentList" },
	        commentNodes
	      );
	    }
	  }]);

	  return CommentList;
	}(React.Component);

	;

	var CommentForm = function (_React$Component4) {
	  _inherits(CommentForm, _React$Component4);

	  function CommentForm(props) {
	    _classCallCheck(this, CommentForm);

	    var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(CommentForm).call(this, props));

	    _this4.state = { author: '', text: '' };
	    _this4.handleAuthorChange = _this4.handleAuthorChange.bind(_this4);
	    _this4.handleTextChange = _this4.handleTextChange.bind(_this4);
	    _this4.handleSubmit = _this4.handleSubmit.bind(_this4);
	    return _this4;
	  }

	  _createClass(CommentForm, [{
	    key: "handleAuthorChange",
	    value: function handleAuthorChange(e) {
	      this.setState({ author: e.target.value });
	    }
	  }, {
	    key: "handleTextChange",
	    value: function handleTextChange(e) {
	      this.setState({ text: e.target.value });
	    }
	  }, {
	    key: "handleSubmit",
	    value: function handleSubmit(e) {
	      e.preventDefault();
	      var author = this.state.author.trim();
	      var text = this.state.text.trim();
	      if (!text || !author) {
	        return;
	      }
	      this.props.onCommentSubmit({ author: author, text: text });
	      this.setState({ author: '', text: '' });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "form",
	        { className: "commentForm", onSubmit: this.handleSubmit },
	        React.createElement("input", {
	          type: "text",
	          placeholder: "Your name",
	          value: this.state.author,
	          onChange: this.handleAuthorChange
	        }),
	        React.createElement("input", {
	          type: "text",
	          placeholder: "Say something...",
	          value: this.state.text,
	          onChange: this.handleTextChange
	        }),
	        React.createElement("input", { type: "submit", value: "Post" })
	      );
	    }
	  }]);

	  return CommentForm;
	}(React.Component);

	;

	ReactDOM.render(React.createElement(CommentBox, { url: "/api/comments", pollInterval: 2000 }), document.getElementById('content'));

/***/ }
/******/ ]);