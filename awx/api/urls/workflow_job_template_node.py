# Copyright (c) 2017 Ansible, Inc.
# All Rights Reserved.

from django.urls import re_path

from awx.api.views import (
    WorkflowJobTemplateNodeList,
    WorkflowJobTemplateNodeDetail,
    WorkflowJobTemplateNodeSuccessNodesList,
    WorkflowJobTemplateNodeFailureNodesList,
    WorkflowJobTemplateNodeAlwaysNodesList,
    WorkflowJobTemplateNodeCredentialsList,
    WorkflowJobTemplateNodeCreateApproval,
    WorkflowJobTemplateNodeLabelsList,
    WorkflowJobTemplateNodeInstanceGroupsList,
)


urls = [
    re_path(r'^$', WorkflowJobTemplateNodeList.as_view(), name='workflow_job_template_node_list'),
    re_path(r'^(?P<pk>[0-9]+)/$', WorkflowJobTemplateNodeDetail.as_view(), name='workflow_job_template_node_detail'),
    re_path(r'^(?P<pk>[0-9]+)/success_nodes/$', WorkflowJobTemplateNodeSuccessNodesList.as_view(), name='workflow_job_template_node_success_nodes_list'),
    re_path(r'^(?P<pk>[0-9]+)/failure_nodes/$', WorkflowJobTemplateNodeFailureNodesList.as_view(), name='workflow_job_template_node_failure_nodes_list'),
    re_path(r'^(?P<pk>[0-9]+)/always_nodes/$', WorkflowJobTemplateNodeAlwaysNodesList.as_view(), name='workflow_job_template_node_always_nodes_list'),
    re_path(r'^(?P<pk>[0-9]+)/credentials/$', WorkflowJobTemplateNodeCredentialsList.as_view(), name='workflow_job_template_node_credentials_list'),
    re_path(r'^(?P<pk>[0-9]+)/labels/$', WorkflowJobTemplateNodeLabelsList.as_view(), name='workflow_job_template_node_labels_list'),
    re_path(r'^(?P<pk>[0-9]+)/instance_groups/$', WorkflowJobTemplateNodeInstanceGroupsList.as_view(), name='workflow_job_template_node_instance_groups_list'),
    re_path(r'^(?P<pk>[0-9]+)/create_approval_template/$', WorkflowJobTemplateNodeCreateApproval.as_view(), name='workflow_job_template_node_create_approval'),
]

__all__ = ['urls']
