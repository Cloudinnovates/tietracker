import { connect, ConnectedProps } from 'react-redux';

import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState } from '../reducers';

import { createClient, initClients } from './clients.thunks';
import { createProject, initActiveProjects } from './projects.thunks';
import { startTask, stopTask, initTask } from './tasks.thunks';

import { ClientData, Client } from '../../models/client';
import { ProjectData, Project } from '../../models/project';
import { computeSummary } from './summary.thunks';

export type RootThunkDispatch = ThunkDispatch<RootState, undefined, Action>;

const mapState = (state: RootState) => ({
    clients: state.clients.clients,
    activeProjects: state.activeProjects.projects,
    taskInProgress: state.taskInProgress.task,
    summary: state.summary.summary
});

const mapDispatch = (dispatch: RootThunkDispatch) => ({
    createClient: (data: ClientData) => dispatch(createClient(data)),
    initClients: () => dispatch(initClients()),

    createProject: (client: Client, data: ProjectData) => dispatch(createProject(client, data)),
    initActiveProjects: () => dispatch(initActiveProjects()),

    startTask: (project: Project) => dispatch(startTask(project)),
    stopTask: () => dispatch(stopTask()),
    initTask: () => dispatch(initTask()),

    computeSummary: () => dispatch(computeSummary())
});

export const rootConnector = connect(
    mapState,
    mapDispatch
);

export type RootProps = ConnectedProps<typeof rootConnector>;
