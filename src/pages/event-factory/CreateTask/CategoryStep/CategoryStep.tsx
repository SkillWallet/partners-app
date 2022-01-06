import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SwButton } from 'sw-web-shared';
import { ReactComponent as CoreTeam } from '@assets/core-team.svg';
import { ReactComponent as Community } from '@assets/community.svg';
import { RootState } from '@store/store.model';
import './CategoryStep.scss';
import { activityTaskSetCurrentStep, activityTaskToggleForCoreTeamMembers } from '@store/Activity/create-activity-task.reducer';

const CategoryStep = () => {
  const dispatch = useDispatch();
  const { activeStep } = useSelector((state: RootState) => state.activityTask.currentStep);
  const isCoreTeamMembersOnly = useSelector((state: RootState) => state.activityTask.isCoreTeamMembersOnly);

  useEffect(() => {
    if (activeStep !== 0) {
      dispatch(
        activityTaskSetCurrentStep({
          activeStep: 0,
          title: 'Step 1 - Tell us who is this for',
          description:
            'This is an Open Task that lets you assign work, creative competitions and daily tasks to other Members of your DAO.',
          toPrevBtnPath: null,
          left: null,
        })
      );
    }
  }, [dispatch, activeStep]);

  return (
    <>
      <div className="sw-category-wrapper">
        <div className="sw-category-options">
          <SwButton
            mode="light"
            btnType="medium"
            onClick={() => dispatch(activityTaskToggleForCoreTeamMembers(true))}
            className={isCoreTeamMembersOnly ? 'active-link' : ''}
            startIcon={<CoreTeam />}
            label="Core Team"
          />
          <SwButton
            mode="light"
            btnType="medium"
            onClick={() => dispatch(activityTaskToggleForCoreTeamMembers(false))}
            className={!isCoreTeamMembersOnly ? 'active-link' : ''}
            startIcon={<Community />}
            label="Community"
          />
        </div>

        <div className="bottom-action">
          <SwButton
            disabled={isCoreTeamMembersOnly === null}
            mode="light"
            component={Link}
            to="/partner/event-factory/create-task/roles"
            label="Next: Assign Role"
          />
        </div>
      </div>
    </>
  );
};

export default CategoryStep;
