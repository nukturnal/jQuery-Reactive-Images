# jQuery Reactive Images

## Implementation

	$(window).load(function() {
		$("#reactive").reactiveImage({
			height: 500,
			valign: "middle"
		});
	});
	
## Properties

`height` is simply the static height of the container you wish to put your image into.

`valign` is much like the old attribute you would use on a TD within a TABLE tag. Since the plugin keeps aspect ratio intact you may want to align the image middle. Default is top.

## Disclaimer

I built this for a personal project knowing this isn't a perfect solution for everyone. If it's lacking what you need, the source is open, fix it.

## License

MIT