import React from 'react';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import {
  CredentialsAPI,
  CredentialInputSourcesAPI,
  CredentialTypesAPI,
  OrganizationsAPI,
  UsersAPI,
} from 'api';
import {
  mountWithContexts,
  waitForElement,
} from '../../../../testUtils/enzymeHelpers';

import CredentialEdit from './CredentialEdit';

jest.mock('../../../api');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 3,
  }),
}));

const mockCredential = {
  id: 3,
  type: 'credential',
  url: '/api/v2/credentials/3/',
  related: {
    named_url: '/api/v2/credentials/oersdgfasf++Machine+ssh++org/',
    created_by: '/api/v2/users/1/',
    modified_by: '/api/v2/users/1/',
    organization: '/api/v2/organizations/1/',
    activity_stream: '/api/v2/credentials/3/activity_stream/',
    access_list: '/api/v2/credentials/3/access_list/',
    object_roles: '/api/v2/credentials/3/object_roles/',
    owner_users: '/api/v2/credentials/3/owner_users/',
    owner_teams: '/api/v2/credentials/3/owner_teams/',
    copy: '/api/v2/credentials/3/copy/',
    input_sources: '/api/v2/credentials/3/input_sources/',
    credential_type: '/api/v2/credential_types/1/',
  },
  summary_fields: {
    organization: {
      id: 1,
      name: 'org',
      description: '',
    },
    credential_type: {
      id: 1,
      name: 'Machine',
      description: '',
    },
    created_by: {
      id: 1,
      username: 'admin',
      first_name: '',
      last_name: '',
    },
    modified_by: {
      id: 1,
      username: 'admin',
      first_name: '',
      last_name: '',
    },
    object_roles: {
      admin_role: {
        description: 'Can manage all aspects of the credential',
        name: 'Admin',
        id: 36,
      },
      use_role: {
        description: 'Can use the credential in a job template',
        name: 'Use',
        id: 37,
      },
      read_role: {
        description: 'May view settings for the credential',
        name: 'Read',
        id: 38,
      },
    },
    user_capabilities: {
      edit: true,
      delete: true,
      copy: true,
      use: true,
    },
    owners: [
      {
        id: 1,
        type: 'user',
        name: 'admin',
        description: ' ',
        url: '/api/v2/users/1/',
      },
      {
        id: 1,
        type: 'organization',
        name: 'org',
        description: '',
        url: '/api/v2/organizations/1/',
      },
    ],
  },
  created: '2020-02-18T15:35:04.563928Z',
  modified: '2020-02-18T15:35:04.563957Z',
  name: 'oersdgfasf',
  description: '',
  organization: 1,
  credential_type: 1,
  inputs: {},
  kind: 'ssh',
  cloud: false,
  kubernetes: false,
};

const mockOrgAdmins = {
  data: {
    count: 1,
    results: [
      {
        id: 1,
        name: 'org',
      },
    ],
  },
};

const mockOrganizations = {
  data: {
    results: [{ id: 1 }],
    count: 1,
  },
};

const mockCredentialResults = {
  data: {
    results: [
      {
        id: 1,
        type: 'credential_type',
        url: '/api/v2/credential_types/1/',
        related: {
          credentials: '/api/v2/credential_types/1/credentials/',
          activity_stream: '/api/v2/credential_types/1/activity_stream/',
        },
        summary_fields: {
          user_capabilities: {
            edit: false,
            delete: false,
          },
        },
        created: '2020-02-12T19:42:43.539626Z',
        modified: '2020-02-12T19:43:03.159739Z',
        name: 'Machine',
        description: '',
        kind: 'ssh',
        namespace: 'ssh',
        managed: true,
        inputs: {
          fields: [
            {
              id: 'username',
              label: 'Username',
              type: 'string',
            },
            {
              id: 'password',
              label: 'Password',
              type: 'string',
              secret: true,
              ask_at_runtime: true,
            },
            {
              id: 'ssh_key_data',
              label: 'SSH Private Key',
              type: 'string',
              format: 'ssh_private_key',
              secret: true,
              multiline: true,
            },
            {
              id: 'ssh_public_key_data',
              label: 'Signed SSH Certificate',
              type: 'string',
              multiline: true,
              secret: true,
            },
            {
              id: 'ssh_key_unlock',
              label: 'Private Key Passphrase',
              type: 'string',
              secret: true,
              ask_at_runtime: true,
            },
            {
              id: 'become_method',
              label: 'Privilege Escalation Method',
              type: 'string',
              help_text:
                'Specify a method for "become" operations. This is equivalent to specifying the --become-method Ansible parameter.',
            },
            {
              id: 'become_username',
              label: 'Privilege Escalation Username',
              type: 'string',
            },
            {
              id: 'become_password',
              label: 'Privilege Escalation Password',
              type: 'string',
              secret: true,
              ask_at_runtime: true,
            },
          ],
        },
        injectors: {},
      },
      {
        id: 9,
        type: 'credential_type',
        url: '/api/v2/credential_types/9/',
        related: {
          credentials: '/api/v2/credential_types/9/credentials/',
          activity_stream: '/api/v2/credential_types/9/activity_stream/',
        },
        summary_fields: {
          user_capabilities: {
            edit: true,
            delete: true,
          },
        },
        created: '2021-02-12T19:13:22.352791Z',
        modified: '2021-02-12T19:14:15.578773Z',
        name: 'Google Compute Engine',
        description: '',
        kind: 'cloud',
        namespace: 'gce',
        managed: true,
        inputs: {
          fields: [
            {
              id: 'username',
              label: 'Service Account Email Address',
              type: 'string',
              help_text:
                'The email address assigned to the Google Compute Engine service account.',
            },
            {
              id: 'project',
              label: 'Project',
              type: 'string',
              help_text:
                'The Project ID is the GCE assigned identification. It is often constructed as three words or two words followed by a three-digit number. Examples: project-id-000 and another-project-id',
            },
            {
              id: 'ssh_key_data',
              label: 'RSA Private Key',
              type: 'string',
              format: 'ssh_private_key',
              secret: true,
              multiline: true,
              help_text:
                'Paste the contents of the PEM file associated with the service account email.',
            },
          ],
          required: ['username', 'ssh_key_data'],
        },
        injectors: {},
      },
    ],
  },
};

const mockInputSources = {
  data: {
    results: [
      {
        id: 34,
        summary_fields: {
          source_credential: {
            id: 20,
            name: 'CyberArk Conjur Secrets Manager Lookup',
            description: '',
            kind: 'conjur',
            cloud: false,
            credential_type_id: 20,
          },
        },
        input_field_name: 'password',
        metadata: {
          secret_path: 'a',
          secret_version: 'b',
        },
        source_credential: 20,
      },
      {
        id: 35,
        summary_fields: {
          source_credential: {
            id: 20,
            name: 'CyberArk Conjur Secrets Manager Lookup',
            description: '',
            kind: 'conjur',
            cloud: false,
            credential_type_id: 20,
          },
        },
        input_field_name: 'become_username',
        metadata: {
          secret_path: 'foo',
          secret_version: 'bar',
        },
        source_credential: 20,
      },
    ],
  },
};

describe('<CredentialEdit />', () => {
  let wrapper;
  let history;

  describe('Initial GET request succeeds', () => {
    beforeEach(async () => {
      [
        [UsersAPI.readAdminOfOrganizations, mockOrgAdmins],
        [OrganizationsAPI.read, mockOrganizations],
        [CredentialsAPI.read, mockCredentialResults],
        [CredentialsAPI.update, { data: { id: 3 } }],
        [CredentialsAPI.readInputSources, mockInputSources],
      ].forEach(([apiMethod, mockData]) => {
        apiMethod.mockResolvedValue(mockData);
      });
      history = createMemoryHistory({ initialEntries: ['/credentials'] });
      await act(async () => {
        wrapper = mountWithContexts(
          <CredentialEdit credential={mockCredential} />,
          {
            context: {
              router: { history },
              me: {
                id: 1,
              },
            },
          }
        );
      });
    });

    test('initially renders successfully', async () => {
      expect(wrapper.find('CredentialEdit').length).toBe(1);
    });

    test('handleCancel returns the user to credential detail', async () => {
      await waitForElement(wrapper, 'isLoading', (el) => el.length === 0);
      await act(async () => {
        wrapper.find('Button[aria-label="Cancel"]').simulate('click');
      });
      wrapper.update();
      expect(history.location.pathname).toEqual('/credentials/3/details');
    });

    test('handleSubmit should post to the api', async () => {
      await waitForElement(wrapper, 'isLoading', (el) => el.length === 0);
      await act(async () => {
        wrapper.find('CredentialForm').prop('onSubmit')({
          user: 1,
          name: 'foo',
          description: 'bar',
          credential_type: '1',
          inputs: {
            username: {
              credential: {
                id: 1,
                name: 'Some cred',
              },
              inputs: {
                foo: 'bar',
              },
            },
            password: 'foo',
            ssh_key_data: 'bar',
            ssh_public_key_data: 'baz',
            ssh_key_unlock: 'foobar',
            become_method: '',
            become_username: {
              credential: {
                id: 1,
                name: 'Some cred',
              },
              inputs: {
                secret_path: '/foo/bar',
                secret_version: '9000',
              },
              touched: true,
            },
            become_password: '',
          },
          passwordPrompts: {
            become_password: true,
          },
        });
      });
      expect(CredentialsAPI.update).toHaveBeenCalledWith(3, {
        user: 1,
        name: 'foo',
        organization: null,
        description: 'bar',
        credential_type: '1',
        inputs: {
          password: 'foo',
          ssh_key_data: 'bar',
          ssh_public_key_data: 'baz',
          ssh_key_unlock: 'foobar',
          become_method: '',
          become_password: 'ASK',
        },
      });
      expect(CredentialInputSourcesAPI.create).toHaveBeenCalledWith({
        input_field_name: 'username',
        metadata: {
          foo: 'bar',
        },
        source_credential: 1,
        target_credential: 3,
      });
      expect(CredentialInputSourcesAPI.update).toHaveBeenCalledWith(35, {
        metadata: {
          secret_path: '/foo/bar',
          secret_version: '9000',
        },
        source_credential: 1,
      });
      expect(CredentialInputSourcesAPI.destroy).toHaveBeenCalledWith(34);
      expect(history.location.pathname).toBe('/credentials/3/details');
    });
    test('inputs are properly rendered', async () => {
      history = createMemoryHistory({ initialEntries: ['/credentials'] });
      await act(async () => {
        wrapper = mountWithContexts(
          <CredentialEdit
            credential={{
              ...mockCredential,
              inputs: {
                project: 'foo',
                username: 'foo@ansible.com',
                ssh_key_data: '$encrypted$',
              },
              kind: 'gce',
              credential_type: 9,
            }}
          />,
          {
            context: { router: { history } },
          }
        );
      });
      wrapper.update();
      expect(wrapper.find('input#credential-username').prop('value')).toBe(
        'foo@ansible.com'
      );
      expect(wrapper.find('input#credential-project').prop('value')).toBe(
        'foo'
      );
      expect(
        wrapper.find('textarea#credential-ssh_key_data').prop('value')
      ).toBe('$encrypted$');
    });
  });

  describe('Initial GET request fails', () => {
    test('shows error when initial GET request fails', async () => {
      CredentialTypesAPI.read.mockRejectedValue(new Error());
      history = createMemoryHistory({ initialEntries: ['/credentials'] });
      await act(async () => {
        wrapper = mountWithContexts(
          <CredentialEdit credential={mockCredential} />,
          {
            context: { router: { history } },
          }
        );
      });
      wrapper.update();
      expect(wrapper.find('ContentError').length).toBe(1);
    });
  });
});
