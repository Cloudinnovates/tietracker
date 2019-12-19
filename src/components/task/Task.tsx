import React from 'react';
import { useSelector } from 'react-redux';

import styles from './Task.module.scss';

import { square } from 'ionicons/icons';

import { RootState } from '../../store/reducers';
import { rootConnector, RootProps } from '../../store/thunks/index.thunks';

import { Task as TaskModel, TaskInProgressClientData, TaskInProgressData } from '../../models/task';

import Spinner from '../spinner/Spinner';
import { IonIcon, IonLabel, IonRippleEffect } from '@ionic/react';

const Task: React.FC<RootProps> = (props: RootProps) => {

    const task: TaskModel | undefined = useSelector((state: RootState) => {
        return state.taskInProgress.task;
    });

    const client: TaskInProgressClientData | undefined = useSelector((state: RootState) => {
        return state.taskInProgress.task !== undefined && state.taskInProgress.task.data ? (state.taskInProgress.task.data as TaskInProgressData).client : undefined
    });

    async function stopTask() {
        await props.stopTask();
        await props.computeSummary();
    }

    return (
        <div className={`${styles.task} ${task !== undefined ? styles.progress : ''}`} style={client !== undefined ? {background: `${client.color}`} : undefined}>
            <div>
                {
                    task !== undefined ? <Spinner color={client !== undefined ? client.color : undefined}></Spinner> : undefined
                }

                <button onClick={() => stopTask()} className="ion-activatable">
                    <IonIcon icon={square} />
                    <IonLabel>Stop</IonLabel>
                    <IonRippleEffect></IonRippleEffect>
                </button>
            </div>
        </div>
    );

}

export default rootConnector(Task);