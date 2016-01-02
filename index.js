var ARRAY_PART_REGEX = /^(.*?)\[(\d+)\]$/;

module.exports = {
  set: set
};

function set(path, val, obj) {
  var parts = getPathParts(path);
  var partsLen = parts.length;
  var i, part, partRef, arrayMatches;

  for (i = 0; i < partsLen; i++) {
    part = parts[i];

    arrayMatches = getArrayMatches(part);

    if (i === 0) {
      if (arrayMatches && !arrayMatches[1]) {
        if (!obj || Array.isArray(obj)) {
          partRef = obj = obj || [];
        } else {
          throw new Error('paver: path structure does not match object provided');
        }
      } else {
        partRef = obj = obj || {};
      }
    }

    if (arrayMatches) {
      if (arrayMatches[1]) {
        partRef = partRef[arrayMatches[1]] = [];
      }

      part = arrayMatches[2];
    }

    if (i === partsLen - 1) {
      partRef[part] = val;
    } else {
      partRef[part] = partRef[part] || (ARRAY_PART_REGEX.test(parts[i + 1]) ? [] : {});
      partRef = partRef[part];
    }
  }

  return obj;
};

function getPathParts(path) {
  if (typeof path === 'string') {
    return path.split(/\.|([^.]*?\[\d+\])/).filter(function(part) {
      return !!part;
    });
  } else {
    throw new Error('paver: invalid path');
  }
}

function getArrayMatches(part) {
  return typeof part === 'string' ? part.match(ARRAY_PART_REGEX) : null;
}