const { collect } = require('collect.js')

module.exports = data => {
  return `\
/** @wordpress */
import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'

/** ${data.get('name')} components */
import { edit } from './containers/edit'
import { save } from './containers/save'
import { attributes } from './attributes.json'

/** ${data.get('name')} styles */
import './../../styles/editor.css'

/**
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made available as an option to any
 * editor interface where blocks are implemented.
 *
 * @param {string} name
 * @param {Object} settings
 */
registerBlockType('${data.get('namespace')}/${data.get('name')}', {
  /**
   * The block title.
   * @param {string}
   */
  title: __("${data.get('title')}", '${data.get('namespace')}'),

  /**
   * A short description of the block.
   */
  description: __("${data.get('description')}", '${data.get('namespace')}'),

  /**
   * The block category.
   */
  category: '${data.get('category')}',

  ${data.get('keywords') ? `\
  /**
   * Searchable keywords for discovery.
   */
  keywords: [${data.get('keywords')}],`:[]}

  ${data.get('icon') ? `\
  /**
   * Icon for the block
   */
  icon: '${data.get('icon')}',`:[]}

  /**
   * Extended support features
   */
  supports: {
    /**
     * Enable alignments.
     * Set to true to enable all.
     */
    align: ${data.get('supports').includes('align')},

    /**
     * Enable wide alignment.
     * Dependent on the supports.align definition.
     */
    alignWide: ${data.get('supports').includes('alignWide')},

    /**
     * This property adds a field to define a custom className
     * for the block wrapper.
     */
    customClassName: ${data.get('supports').includes('customClassName')},

    /**
     * Allow a block's markup to be edited.
     */
    html: ${data.get('supports').includes('html')},

    /**
     * Hide a block from the inserter so that it can
     * only be inserted programmatically.
     */
    inserter: ${data.get('supports').includes('inserter')},

    /**
     * A non-multiple block can be inserted into each post, one time only.
     */
    multiple: ${data.get('supports').includes('multiple')},

    /**
     * Allows the block to be used as a Reusable Block.
     */
    reusable: ${data.get('supports').includes('reusable')},
  },

  /**
   * Block attributes.
   */
  attributes,

  /**
   * Component to render in the editor.
   */
  edit,

  /**
   * Component to render to the database.
   */
  save,
});
`
}
