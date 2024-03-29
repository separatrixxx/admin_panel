module.exports = {
	i18n: {
	  locales: ['en', 'pt'],
	  defaultLocale: 'en',
	},
	images: {
	  domains: ['https://panel.7club.com.br/'],
	},
	transpilePackages: ["next-image-export-optimizer"],
	env: {
	  nextImageExportOptimizer_imageFolderPath: "public/images",
	  nextImageExportOptimizer_exportFolderPath: "out",
	  nextImageExportOptimizer_quality: 75,
	  nextImageExportOptimizer_storePicturesInWEBP: true,
	  nextImageExportOptimizer_exportFolderName: "nextImageExportOptimizer",
	  nextImageExportOptimizer_generateAndUseBlurImages: true,
	},
	webpack(config) {
	  config.module.rules.push({
		loader: '@svgr/webpack',
		issuer: /\.[jt]sx?$/,
		options: {
		  prettier: false,
		  svgo: true,
		  svgoConfig: {
			plugins: [{
			  name: 'preset-default',
			  params: {
				override: {
				  removeViewBox: false
				}
			  }
			}],
		  },
		  titleProp: true,
		},
		test: /\.svg$/,
	  });
  
	  return config;
	},
  };