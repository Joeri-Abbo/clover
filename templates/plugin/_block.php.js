module.exports = data => `\
<?php
/**
 * Plugin Name:  ${data.get('name')}
 * Plugin URI:   ${data.get('website')}
 * Description:  ${data.get('description')}
 * Version:      0.0.1
 * Author:       ${data.get('author')} <${data.get('email')}>
 * License:      MIT
 * Text Domain:  ${data.get('namespace')}
 */

/**
 * Register ${data.get('namespace')} block assets
 *
 * @see Enqueueing Editor Assets <https://git.io/JvPHy>
 * @see Dependency Extraction Webpack Plugin <https://git.io/Jv1ll>
 */
add_action('init', function () {
    (new class() {
        /**
         * Blocks.
         * @var array
         */
        public $blocks = [
            "${data.get('namespace')}/${data.get('name')}"
        ];

        /**
         * ${data.get('namespace')} plugin directory.
         * @var string
         */
        public $dir;

        /**
         * Class constructor.
         */
        public function __construct()
        {
            $this->dir = dirname(__FILE__);
        }

        /**
         * Class invocation.
         *
         * @throws \\WP_Error
         * @return void
         */
        public function __invoke(): void
        {
            foreach ($this->blocks as $block) {
                $this->registerScripts($block);
                $this->registerStyles($block);
                $this->registerBlockType($block);
            }
        }

        /**
         * Register scripts.
         *
         * @param  string
         * @return void
         */
        protected function registerScripts(string $block): void
        {
            foreach (['editor', 'public'] as $scriptName) {
                /**
                 * Throw an error if the dependency manifest has not
                 * been generated or is otherwise not found.
                 */
                if (! realpath($manifestFile = "{$this->dir}/dist/{$scriptName}.asset.json")) {
                    throw new \\WP_Error(
                        'manifest_not_found',
                        "There was an issue registering " . $this->name,
                        "Run 'npm build' in " . $this->dir
                    );
                }

                /** Process webpack dependency manifest */
                $manifestJSON = file_get_contents($manifestFile);
                $manifest = array_values(json_decode($manifestJSON, true));

                if (realpath("{$this->dir}/dist/{$scriptName}.js")) {
                    wp_register_script(
                        "{$block}/{$scriptName}/js",
                        plugins_url("dist/{$scriptName}.js", __FILE__),
                        ...$manifest
                    );
                }
            }
        }

        /**
         * Register styles.
         *
         * @param  string
         * @return void
         */
        protected function registerStyles($block): void
        {
            foreach (['editor', 'public'] as $styleName) {
                if (realpath("{$this->dir}/dist/{$styleName}.css")) {
                    wp_register_style(
                        "{$block}/{$styleName}/css",
                        plugins_url("dist/{$styleName}.css", __FILE__),
                        [],
                        null
                    );
                }
            }
        }

        /**
         * Register block.
         *
         * @param  string
         * @return void
         */
        protected function registerBlockType(string $block): void
        {
            register_block_type($block, [
                'editor_script' => "{$block}/editor/js",
                'editor_style' => "{$block}/editor/css",
            ]);
        }
    })();
});

`
