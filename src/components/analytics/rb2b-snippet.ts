/** RB2B account script ID and the tracker URL that serves it (S3; the CloudFront host returns 403 for this key). */
export const RB2B_ID = "7N850HKD8JN1";
export const RB2B_SRC = `https://s3-us-west-2.amazonaws.com/b2bjsstore/b/${RB2B_ID}/reb2b.js.gz`;

/**
 * RB2B's documented snippet (v1.0.1), rendered inline in <head> by the root layout. It defines the `reb2b` queue that
 * RB2B's verification checks for and loads the tracker from S3 (the CloudFront host in the newer dashboard snippet
 * returns 403 for this key).
 */
export const rb2bSnippet = `!function(){var reb2b=window.reb2b=window.reb2b||[];if(reb2b.invoked)return;reb2b.invoked=true;reb2b.methods=["identify","collect"];reb2b.factory=function(method){return function(){var args=Array.prototype.slice.call(arguments);args.unshift(method);reb2b.push(args);return reb2b;};};for(var i=0;i<reb2b.methods.length;i++){var key=reb2b.methods[i];reb2b[key]=reb2b.factory(key);}reb2b.load=function(key){var script=document.createElement("script");script.type="text/javascript";script.async=true;script.src="https://s3-us-west-2.amazonaws.com/b2bjsstore/b/"+key+"/reb2b.js.gz";var first=document.getElementsByTagName("script")[0];first.parentNode.insertBefore(script,first);};reb2b.SNIPPET_VERSION="1.0.1";reb2b.load("${RB2B_ID}");}();`;
