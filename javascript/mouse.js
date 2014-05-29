// Generated by CoffeeScript 1.4.0
(function() {

  NAN.Mouse = (function() {

    function Mouse() {
      this.path = [];
      this.state = "none";
    }

    Mouse.prototype.checkPath = function() {
      var i, result, _i, _ref;
      result = true;
      if (this.path.length < 2) {
        result = false;
      }
      if (this.path.length > 0) {
        for (i = _i = 0, _ref = this.path.length - 1; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          if (this.path[i].grid.isConnecting(this.path[i + 1].grid) === false) {
            result = false;
          }
        }
      }
      return result;
    };

    Mouse.prototype.evaluatePath = function() {
      var node, result, val, _i, _len, _ref;
      result = "";
      _ref = this.path;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        val = node.grid.value;
        result += val.toString();
      }
      return result;
    };

    Mouse.prototype.beginPath = function() {
      this.path = [];
      return this.state = "select";
    };

    Mouse.prototype.endPath = function() {
      var descriptions, i, node, numberString, result, _i, _j, _len, _ref, _ref1;
      if (this.state === "none" || $.game.gameOver) {
        return;
      }
      if (this.checkPath() && !$.numberShow) {
        numberString = this.evaluatePath();
        result = $.analyzer.analyze(numberString);
        descriptions = result.descriptions.filter(function(desc) {
          return desc !== null && desc !== "";
        }).join("<br>");
        if (result.score === 0) {
          descriptions = "";
        }
        $.numberShow = new NAN.NumberShow({
          n: numberString,
          descriptions: descriptions,
          score: result.score
        });
        $.game.score.addValue(result.score);
        if (result.score !== 0) {
          for (i = _i = 0, _ref = this.path.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            node = this.path[i];
            $.audioPlayerB.playString(numberString);
            node.grid.clean();
          }
        }
      }
      _ref1 = this.path;
      for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
        node = _ref1[_j];
        node.grid.selected = false;
      }
      this.state = "none";
      return this.path = [];
    };

    Mouse.prototype.addGrid = function(grid) {
      var inside, node, _i, _len, _ref;
      if (this.path.length >= 9) {
        return;
      }
      if (this.path.length === 0 && grid.value === 0) {
        return;
      }
      inside = false;
      _ref = this.path;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if (node.x === grid.x && node.y === grid.y) {
          inside = true;
        }
      }
      if (!inside) {
        if (this.path.length === 0 || this.path[this.path.length - 1].grid.isConnecting(grid)) {
          grid.makeSound();
          grid.selected = true;
          node = {
            x: grid.x,
            y: grid.y,
            grid: grid
          };
          return this.path.push(node);
        }
      }
    };

    return Mouse;

  })();

}).call(this);
