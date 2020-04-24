module.exports = data => `
  /** @wordpress */
  import { __ } from '@wordpress/i18n'
  ${
    data.get('components').includes('InnerBlocks') || data.get('components').includes('RichText') || data.get('components').includes('MediaUpload')
      ? `import {
      ${data.get('components').includes('InnerBlocks') ? `InnerBlocks,` : []}
      ${data.get('components').includes('RichText') ? `RichText,` : []}
  } from '@wordpress/block-editor'\n`
      : []
  }\

  /** Modules */
  import PropTypes from 'prop-types'

  /** Components */
  ${data.get('components').includes('MediaUpload') ? `import Media from './../components/Media'` : []}

  /**
   * Edit: ${data.get('namespace')}/${data.get('name')}
   *
  ${data.get('components').includes('MediaUpload') ? ` * @prop {string} attribute.mediaUrl\n` : []}\
  ${data.get('components').includes('MediaUpload') ? ` * @prop {number} attribute.mediaId\n` : []}\
  ${data.get('components').includes('RichText') ? ` * @prop {string} attribute.text\n` : []}\
  */
  const edit = ({ attributes, className, setAttributes }) => {
    ${
      (data.get('components').includes('RichText') || data.get('components').includes('MediaUpload')) &&
      `\
      const {
        ${data.get('components').includes('MediaUpload') ? `mediaId, mediaUrl,` : []}
        ${data.get('components').includes('RichText') ? `text,` : []}
      } = attributes;`
    }

    /**
     * Generic attribute handler.
     *
     * @param {string} attribute key
     * @param {mixed}  attribute value
     */
    const onAttribute = (attr, value) => {
      setAttributes({ [\`$\{attr}\`]: value })
    }

    ${
      data.get('components').includes('MediaUpload')
        ? `
        /**
         * Media attribute handler.
         *
         * @param {number} mediaId
         * @param {string} mediaUrl
         */
        const setMedia = media => {
          setAttributes({
            mediaId: media.id,
            mediaUrl: media.url
          })
        }`
        : []
    }

    /**
     * Render the component.
     */
    return (
      <div className={className}>
        ${
          data.get('components').includes('MediaUpload')
            ? `
            <Media
              id={mediaId || ''}
              url={mediaUrl || ''}
              setMedia={setMedia}
            />`
            : []
        }

        ${
          data.get('components').includes('RichText')
            ? `
            <RichText
              placeholder={__('placeholder heading', '${data.get('namespace')}')}
              tagName={\`h2\`}
              value={text || ''}
              onChange={value => onAttribute('text', value)}
            />`
            : []
        }

        ${data.get('components').includes('InnerBlocks') ? `<InnerBlocks />` : []}
      </div>
    )
  }

  edit.propTypes = {
    attributes: PropTypes.shape({
      ${data.get('components').includes('MediaUpload') ? `mediaId: PropTypes.number,` : []}
      ${data.get('components').includes('MediaUpload') ? `mediaUrl: PropTypes.string,` : []}
      ${data.get('components').includes('RichText') ? `text: PropTypes.string,` : []}
    }),
    className: PropTypes.string,
    isSelected: PropTypes.bool,
    setAttributes: PropTypes.func,
  }

  export { edit }
`
