module.exports = data => `
  /** @wordpress */
  import { getBlockDefaultClassName } from '@wordpress/blocks'\
  ${(data.get('components').includes('InnerBlocks') || data.get('components').includes('RichText'))
    ? `
      import {
        ${data.get('components').includes('InnerBlocks') ? `InnerBlocks,` : []}
        ${data.get('components').includes('RichText') ? `RichText,` : []}
      } from '@wordpress/block-editor'`
    : []
  }

  /** Modules */
  import PropTypes from 'prop-types'

  /**
   * Save: ${data.get('namespace')}/${data.get('name')}
   *
  ${data.get('components').includes('MediaUpload') ? ` * @prop {string} attribute.mediaUrl\n` : []}\
  ${data.get('components').includes('MediaUpload') ? ` * @prop {number} attribute.mediaId\n` : []}\
  ${data.get('components').includes('RichText') ? ` * @prop {string} attribute.text\n` : []}\
  */
  const save = ({ attributes }) => {
    const className = getBlockDefaultClassName('${data.get('namespace')}/${data.get('name')}')\
    ${(data.get('components').includes('MediaUpload') || data.get('components').includes('RichText'))
      ? `
        const {
          ${data.get('components').includes('MediaUpload') ? `mediaUrl,` : []}
          ${data.get('components').includes('RichText') ? `text,` : []}
        } = attributes;`
      : []
    }

    /**
     * Render the component.
     */
    return (
      <>
        ${data.get('components').includes('MediaUpload') ? `
          {mediaUrl && (
            <figure>
              <img alt="alt text" src={mediaUrl} />
            </figure>
          )}
        ` : []}

        ${data.get('components').includes('RichText') ? `
          {text && (
            <RichText.Content
              tagName={'h2'}
              className={\`$\{className}__text\`}
              value={text}
            />
          )}
        ` : []}

        ${data.get('components').includes('InnerBlocks') ? `<InnerBlocks.Content />` : []}
      </>
    )
  }

  save.propTypes = {
    attributes: PropTypes.shape({
      ${data.get('components').includes('MediaUpload') ? `mediaId: PropTypes.number,` : []}\
      ${data.get('components').includes('MediaUpload') ? `mediaUrl: PropTypes.string,` : []}\
      ${data.get('components').includes('RichText') ? `text: PropTypes.string,` : []}\
    }),
  }

  export { save }

`
