/**
 * Creates a new HTML element and appends it to a parent node.
 * Example usage:
 * const myImg = createElement('p', document.getElementById('preview-list'), null, ['story'], null, {'src': 'something'})
 *
 * @param {string} type - The type of HTML element to create (e.g., 'div', 'p', 'input').
 * @param {HTMLElement} parentNode - The parent node to which the created element will be appended.
 * @param {string|null} content - The content to be set for the element (use null for no content).
 * @param {Array<string>} classes - An array of CSS class names to add to the element.
 * @param {string|null} id - The value for the 'id' attribute of the element (use null for no id).
 * @param {Object|null} attributes - An object containing key-value pairs for additional attributes.
 * @param {boolean} useInnerHtml - A flag indicating whether to use inner HTML for content (true) or text content (false).
 *
 * @returns {HTMLElement} The created HTML element.
 */
export default function createElement(type, parentNode, content, classes, id, attributes, useInnerHtml) {
    const htmlElement = document.createElement(type)
    if (content && useInnerHtml) {
        htmlElement.innerHTML = content
    } else {
        if (content && type !== 'input') {
            htmlElement.textContent = content
        }
        if (content && type === 'input') {
            htmlElement.value = content
        }
    }
    if (classes && classes.length > 0) {
        htmlElement.classList.add(...classes)
    }
    if (id) {
        htmlElement.id = id
    }
    // {src: 'link', href: 'http'}
    if (attributes) {
        for (const key in attributes) {
            htmlElement.setAttribute(key, attributes[key])
            // htmlElement[key] = attributes[key] // option2
        }
    }
    if (parentNode) {
        parentNode.appendChild(htmlElement)
    }
    return htmlElement
}
