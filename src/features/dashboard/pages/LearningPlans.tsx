import { Separator } from '@/shared/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import LearningPlanList from '../components/learning-plans/LearningPlanList';
import LearningPlanPreferences from '../components/learning-plans/LearningPlanPreferences';

const LearningPlansPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between px-8 pt-10">
        {/* Page Header */}
        <h1 className="text-2xl font-bold text-purple-700">Learning Plans</h1>
      </div>

      <Tabs defaultValue="plans">
        <TabsList className="px-8" variant="line">
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        <Separator />

        <div className="flex flex-col gap-8 pt-6">
          <TabsContent value="plans" className="px-8">
            <LearningPlanList />
          </TabsContent>

          <TabsContent value="preferences" className="px-8">
            <LearningPlanPreferences />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default LearningPlansPage;
