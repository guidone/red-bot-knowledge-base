import React from 'react';
import _ from 'lodash';
import { Notification, Button } from 'rsuite';
import { plug } from 'code-plug';

import { Content, withConfigurationPage, HelpElements } from '../../src/components';
import useSocket from '../../src/hooks/socket';

const { Contents, Categories } = Content;
const { NodeRedNode, SlugHelp, TypeCommand, ChatbotStatus } = HelpElements;

import ConfigurationForm from './views/form';

const Legend = () => {
  const { sendMessage } = useSocket();
  return (
    <div>
      <NodeRedNode>Knowledge Base</NodeRedNode>
      <p>
        Configure the <b>Knowledge Base</b> block, use the <b>Articles</b> section to enter the knowledge base of your product or
        service.<br/>
        For articles that represent the same content but in different languages, use the same <em>slug</em>, the block will take care of
        the rest.
      </p>
      <p>
        Adjust the sensitivity of the search engine, raise it when the results are not relevant to the user's question, lower it when the
        search is not returning anything, keep an eye on the system console to see the score of the searches.<br/>
        With <b>Answer by Default</b> the block can answer automatically to any input text message or can start answering only when the
        chatbot in <ChatbotStatus>faq.answer</ChatbotStatus> status, which is entered when the user types senteces like <TypeCommand>I need help</TypeCommand>.
      </p>
      <SlugHelp/>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Button
          appearance="primary"
          onClick={() => {
            sendMessage('faq.refresh');
            Notification.success({ title: 'Knowledge Base', description: 'Re-index of articles started' })
          }}
          >Refresh index</Button>
      </div>
    </div>
  );
};



// sidebar items
plug(
  'sidebar',
  null,
  {
    id: 'knowledgebase',
    label: 'Knowledge Base',
    url: '/knowledge-base',
    icon: 'file-text',
    permission: 'faq.edit',
    options: [
      { label: 'Articles', url: '/knowledge-base', id: 'faqs' },
      { label: 'Categories', url: '/knowledge-base/categories', id: 'faqs-categories' }
    ]
  }
);
plug(
  'sidebar',
  null,
  {
    id: 'knowledgebase',
    label: 'Knowledge Base',
    url: '/knowledge-base',
    icon: 'file-text',
    permission: ['faq.configure', 'configure'],
    options: [
      { label: 'Configuration', url: '/knowledge-base/configure', id: 'faqs-configure' }
    ]
  }
);
// pages
plug('pages', Categories, {
  url: '/knowledge-base/categories',
  title: 'Categories',
  id: 'faq-categories',
  permission: 'faq.edit',
  namespace: 'faq',
  breadcrumbs: [
    { title: 'Knowledge Base', url: '/knowledge-base' },
    'Categories'
  ]
});
plug(
  'pages',
  withConfigurationPage(
    'knowledge-base',
    ConfigurationForm,
    { Legend, title: 'Knowledge Base' }
  ),
  {
    url: '/knowledge-base/configure',
    title: 'Configure',
    id: 'faqs-configure',
    permission: ['faq.configure', 'configure'],
  }
);
plug('pages', Contents, {
  url: '/knowledge-base',
  title: 'Knowledge Base',
  id: 'faqs',
  namespace: 'faq',
  permission: 'faq.edit',
  breadcrumbs: ['Knowledge Base', 'Articles'],
  labels: {
    saveContent: 'Save article'
  }
});
// permissions
plug(
  'permissions',
  null,
  {
    permission: 'faq.edit',
    name: 'Edit Kwnowledge base',
    description: 'Add and edit articles of the knowledge base',
    group: 'Knowledge Base'
  }
);
plug(
  'permissions',
  null,
  {
    permission: 'faq.configure',
    name: 'Configure Kwnowledge base',
    description: 'Configure Kwnowledge base',
    group: 'Knowledge Base'
  }
);